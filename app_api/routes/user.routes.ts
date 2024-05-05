import express from 'express';
import { auth } from '../middleware/auth';
import AuthCtrl from '../controllers/auth.controller';

const router = express.Router();
const authCtrl = new AuthCtrl();

router.route('/users')  // Assuming you have implemented this in your controller
    .get(authCtrl.getAllUsers);

router.route('/users/:id')
    .put(authCtrl.updateUser)  // Change to PUT if that's what you intend to use
    .delete(authCtrl.deleteUser)
    .patch(authCtrl.updateAdminStatus); // This seems already in place for patching admin status

router.route('/login')
    .post(authCtrl.login);

router.route('/register')
    .post(authCtrl.register);

// This route should come after the specific routes like '/users'
router.route('/:email')
    .get(authCtrl.getUser);

export default router;
