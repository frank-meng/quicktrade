# Quicktrade -- development process

## 1. Setup App

GIT repository: https://github.com/frank-meng/quicktrade

The app’s skeleton is based on the book Angular Development With Typescript 2nd Edition. I want the app to be reactive, using technology such as RxJS6, NGRX, Forms API , OAuth2, JWT, Reactive UI ,Flex Layout, Material UI.

My NodeJS version is 8. After the project is created, I add style and themes following the book’s instructions. Then I make changes in Angular.json to use the style files.

Commands:
```
ng new quicktrade --prefix qt --routing --style=scss
npm i --save @angular/cdk@8.2.3 @angular/material@8.2.3
npm i @angular/flex-layout@8.0.0-beta.27
```
## 2. Create Components
	The project folder structure is :
             --src  
	       ------styles   
                  ------environments 	
                   ----- app
	               ------components
                          ------shared
                          ------services
                         -------models
                         -------store		
	
At beginning, the app has two pages: Home (showing accounts) and Order (include quote).  There are many back and forth decisions on where to put the User info and navigation info: 
- The currentUse is app level. So it should be in the default app component. So is the app level navigation.
- On the other hand, it is not clean to put too much code into the App component.


So finally, I decided to put nav and menu in the App component, but user info in the Home component. Although I include Material and flex libs, I do not use them much. The UI design is put off for the next phase.  

Commands:
```
ng g c home
ng g c accountgrid
...
ng g s service/user
ng g s service/accounts
ng g s service/trade
```
## TODO:  add a open account, footer component, implement menu, themes seem not working 

## 3. Connect to backend
The real backend is a SpringBoot REST server. Angular has a nice HTTPClient tool to connect to rest servers. But I don’t want to spend time on this at the beginning. So I did this in three steps:
1. Return static response in service layer. Once this is done, the app is runnable, and I can navigate between pages with data showing on them. Also I can test layout and style.
2. Create the FakeBackend using HttpInterceptor. Now the service code is real, but all traffic goes to the FakeBackend first. The FackBackend can simulate real responses based on patterns, So some calls go to real back, others to fack one. It is very useful because the real backend is also changing.  The fake one can also simulate authentication responses to make testing faster.
3. Connect to the real backend, both Trader and Exchange applications. Also the authentication server is KeyCloak running on my local. 

Server endpoint URLs are in environment.

Now the whole solution is on AWS. S3 service holds the UI pice. The UI client can talk to a public KeyCloak server (running in an AWS EC2 container), and application server ( another docker container in AWS).

## TODO:  enable SSL in all layers

## 4. Added Login/authentication, but later removed

At begining, I created Login component, SignUp component, authGuard, and authentication service. This is to simulate the self managed authentication/authorization style. But soon I decided to dedicate the CIAM piece to KeyCloak server, and leverage the OpenID protocol for authentication. 

Now, the app doesn't manage login, signUp any more. KeyCloak can even do MFA during signin.

## TODO: can the server trigers step-up in processing request? for example selling a stock 10% below the market price.

## 5.Add Keycloak and JWT

I installed KeyCloak standalone verson on my local, and created a simple client using Angular App to test it. Everything works fine. Meanwhile, I implemented the JWT verification on sprintboot server side. Some of the considerations:

- Store tokens. I tried to store tokens on Cookie and LocalStorage. 
	- Cookie is good because it has expiration setting. So in theory, tokens will be unavialble automatically once it passes the expiry date. I tried two different cookie npm libs but none of them worked well. They are not reliable, and have issue in token refresh code as well. 
	- LocalStorage is nother choice, and I made it worked. But the storage can not store Object, but only string. The code became cubersome. 
	- Finnally, I decided to use NGRX to store tokens. It is much cleaner and stable.
	
- Inject token. The JWT token injection uses HttpInterceptor. The logic is configurable based on the URL pattern. I can choose not inject JWT for some URL requests. 
- Refresh token. This also leverages HttpInterceptor. At begining, I check the access token expiry before sending any request. If it is already expired, the token refresh logic kicks in. However, it did not work well. At last, I moved the logic in the error handling part - execuing it when a request was rejected because of 401 error. 

All JWT token handling code is in UserService.

KeyClaok offers a container based server. I have deployed it on AWS and everything works well. The KeyCloak endpoint URL is defined in environment.

[Keycloak getting-started](https://www.keycloak.org/getting-started/getting-started-zip)

## TODO: is it safe to refresh token from client side?   

## 6.NGRX

NGRX is very fast and clean. All data objects have been moved to ngrx store, including tokens, User, Accounts, Quote, Order.

```
npm i @ngrx/store@8.6.0
npm i @ngrx/effects@8.6.0
npm i @ngrx/store-devtools@8.6.0
```

I had a hard time to make the production build working with NGRX. I have multiple states object and everything works well in dev mode. But in production build, I can only register state oject, otherwise the whole thing falls apart. It is very frustrating that dev and production have different behavior.  I treid to make each object seperate module and use lazy loading to laod them one by one. But this still does not work in production build. Eventually, I combined all state objects into one, and slice them later in my selector and reducer.  

Need to spend some time later to make the lazy loaing working in prod build. 


## TODO:  WebSock to receive push notification. Lint, Unit tests, e2e test 

