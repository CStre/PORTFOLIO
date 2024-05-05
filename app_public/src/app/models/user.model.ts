export default interface User {
  _id? : string;
  name : string;
  email : string;
  isAdmin : boolean;
  createdAt?: Date;
}

