import mongoose, { Document } from 'mongoose';
import crypto from 'crypto';
import jwt, { Jwt } from 'jsonwebtoken';

export interface IUser extends Document {
    name: string,  
    email: string,
    isAdmin: boolean,
    hash: string,
    salt: string,
    setPassword: (password: string) => void,
    validPassword: (password: string) => boolean,
    generateJwt: () => Jwt,
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: false
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  hash: String,
  salt: String
},
{
    timestamps: true,
}
)

userSchema.methods.setPassword = function (password: string) {
  console.log("Setting password...");
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
  console.log(`Password set with hash: ${this.hash} and salt: ${this.salt}`);
};

userSchema.methods.validPassword = function (password: string) {
  console.log("Validating password...");
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
  const isValid = this.hash === hash;
  console.log(`Password validation result: ${isValid}`);
  return isValid;
};

userSchema.methods.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    name: this.name,
    email: this.email,
    isAdmin: this.isAdmin,
    exp: expiry.getTime()
  }, process.env.JWT_SECRET!);
};

export default mongoose.model<IUser>('User', userSchema);
