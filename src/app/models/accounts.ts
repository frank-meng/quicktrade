export class Account {
    constructor(
        public name: string,
        public category: string,
        public buyingPower?: number,
        public balance?: number,
        public holdings?: Array<Position>) { }
}


export class Position {
    constructor(
        public id: number,
        public symbol: string,
        public nos: number,
        public bookPrice: number,
        public date?: string
    ){}
}