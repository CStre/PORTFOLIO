"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
userSchema.methods.setPassword = function (password) {
    console.log("Setting password...");
    this.salt = crypto_1.default.randomBytes(16).toString('hex');
    this.hash = crypto_1.default
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
    console.log(`Password set with hash: ${this.hash} and salt: ${this.salt}`);
};
userSchema.methods.validPassword = function (password) {
    console.log("Validating password...");
    const hash = crypto_1.default
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
    const isValid = this.hash === hash;
    console.log(`Password validation result: ${isValid}`);
    return isValid;
};
userSchema.methods.generateJwt = function () {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jsonwebtoken_1.default.sign({
        _id: this._id,
        name: this.name,
        email: this.email,
        isAdmin: this.isAdmin,
        exp: expiry.getTime()
    }, process.env.JWT_SECRET);
};
exports.default = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=user.model.js.map