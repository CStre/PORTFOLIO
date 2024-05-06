"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const user_model_1 = __importDefault(require("../models/user.model"));
passport_1.default.use(new passport_local_1.default.Strategy({
    usernameField: 'email'
}, (username, password, done) => {
    user_model_1.default.findOne({ email: username })
        .then((user) => {
        if (!user || !user.validPassword(password)) {
            return done(null, false, {
                message: 'Incorrect username or password'
            });
        }
        return done(null, user);
    })
        .catch((err) => {
        return done(null, false, err);
    });
}));
//# sourceMappingURL=passport.js.map