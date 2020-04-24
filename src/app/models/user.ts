
export class User {
        id: number;
        username: string;
        password: string;
        firstName: string;
        lastName: string;
        token: string;
       
        accounts?: Array<Account>; 
}


export class JwtToken {
    constructor(
        public access_token: string,
        public access_token_expiry_date: Date,

        public refresh_token: string,
        public refresh_token_expiry_date: Date,

        public scope: string
    ){}
}