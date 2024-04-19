import mongoose, { Document } from 'mongoose';
import crypto from 'crypto';
import jwt, { Jwt } from 'jsonwebtoken';

export interface IUser extends Document {
    email: string,
    name: string,
    hash: string,
    salt: string,
    setPassword: (pasword: string) => void,
    validPassword: (pasword: string) => boolean,
    generateJwt: () => Jwt,
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
};

userSchema.methods.validPassword = function (password: string) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: expiry.getTime() / 1000
  }, process.env.JWT_SECRET!);
};

export default mongoose.model<IUser>('User', userSchema);