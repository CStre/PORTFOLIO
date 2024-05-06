"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const visitor_controller_1 = __importDefault(require("../controllers/visitor.controller"));
const router = express_1.default.Router();
const visitCtrl = new visitor_controller_1.default();
router.route('')
    .get(visitCtrl.getAll)
    .post(visitCtrl.addVisitor);
router.route('/:id')
    .get(visitCtrl.getVisitor)
    .put(visitCtrl.updateVisitor)
    .delete(visitCtrl.deleteVisitor);
exports.default = router;
//# sourceMappingURL=visitor.routes.js.map