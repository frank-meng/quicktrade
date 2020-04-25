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
## 2.Create Components
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


So finally, I put nav and menu in the App component, but user info in the Home component. Although I include Material and flex libs, I do not use them much. The UI design can be left to the next phase.  

Commands:
```
ng g c home
ng g c accountgrid
...
ng g s service/user
ng g s service/accounts
ng g s service/trade
```
### TODO:  add a footer component, implement menu, themes seem not working 

## 3.Connect to backend
The real backend is a SpringBoot REST server. Angular has a nice HTTPClient tool to connect to rest servers. But I don’t want to spend time on this at the beginning. So I did this in three steps:
Return static response in service layer. Once this is done, the app is runnable, and I can navigate between pages with data showing on them. Also I can test layout and style.
Create the FakeBackend using HttpInterceptor. Now the service code is real, but all traffic goes to the FakeBackend first. The FackBackend can simulate real responses based on patterns, So some calls go to real back, others to fack one. It is very useful because the real backend is also changing.  The fake one can also simulate authentication responses to make testing faster.
Connect to the real backend, both Trader and Exchange applications. Also the authentication server is KeyCloak running on my local. 

### TODO:  enable SSL in all layers, enable remote KeyCloak 
## 4.Added Login

## 5.Added Keycloak and JWT
## 6.NGRX

```
npm i @ngrx/store@8.6.0
npm i @ngrx/effects@8.6.0
@ngrx/store-devtools
```





### TODO:  Lint, Unit tests, Readme 

