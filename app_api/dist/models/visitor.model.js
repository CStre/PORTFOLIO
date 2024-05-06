"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const visitSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    company: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: false
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('Visit', visitSchema);
//# sourceMappingURL=visitor.model.js.map