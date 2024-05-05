export default interface Visitor {
  id: string;
  name: string;
  company: string;
  email: string;
  createdAt?: Date;
}


export interface IVisitor {
    _id : string;
    name : string;
    company : string;
    email : string;
    createdAt?: Date;
    __v : number;
}
