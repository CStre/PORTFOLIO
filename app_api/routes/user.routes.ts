import express from 'express';
import AuthCtrl from '../controllers/auth.controller';

const router = express.Router();
const authCtrl = new AuthCtrl();

router.route('/users')  // Assuming you have implemented this in your controller
    .get(authCtrl.getAllUsers);

router.route('/users/:id') // This route handles DELETE requests by ID
    .delete(authCtrl.deleteUser);

router.route('/users/:id')
    .patch(authCtrl.updateAdminStatus);

router.route('/login')
    .post(authCtrl.login);

router.route('/register')
    .post(authCtrl.register);

// This route should come after the specific routes like '/users'
router.route('/:email')
    .get(authCtrl.getUser);

export default router;
