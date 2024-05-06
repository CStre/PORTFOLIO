"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const router = express_1.default.Router();
const authCtrl = new auth_controller_1.default();
router.route('/users') // Assuming you have implemented this in your controller
    .get(authCtrl.getAllUsers);
router.route('/users/:id')
    .put(authCtrl.updateUser) // Change to PUT if that's what you intend to use
    .delete(authCtrl.deleteUser)
    .patch(authCtrl.updateAdminStatus); // This seems already in place for patching admin status
router.route('/login')
    .post(authCtrl.login);
router.route('/register')
    .post(authCtrl.register);
// This route should come after the specific routes like '/users'
router.route('/:email')
    .get(authCtrl.getUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map