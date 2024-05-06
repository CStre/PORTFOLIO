"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
// MongoDB connection
const NAME = process.env.DB_NAME;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const connectString = `mongodb+srv://${USER}:${PASSWORD}@cluster0.ynnv63f.mongodb.net/?retryWrites=true&w=majority&appName=${NAME}`;
mongoose_1.default.connect(connectString);
mongoose_1.default.connection.on('connected', () => {
    console.log(`Mongoose connected`);
});
mongoose_1.default.connection.on('error', (err) => {
    console.log(`Mongoose connection error:`, err);
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});
//# sourceMappingURL=_db.js.map