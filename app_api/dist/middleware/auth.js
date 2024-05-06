"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            else {
                req.user = decoded;
                next();
            }
        });
    }
    else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map