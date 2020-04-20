
export class Order {
    constructor(
        public symbol: string,
        public nos: number,
        public isBuy: boolean,
        public price: number,
        public accountName: string
    ){}
}

export class Quote {
    constructor(
        public symbol: string,
        public price: number,
    ){}
}

export class Transaction {
    constructor(
        public id: number,
        public symbol: string,
        public nos: number,
        public isBuy: boolean,
        public bookPrice: number,
        public date?: string
    ){}
}