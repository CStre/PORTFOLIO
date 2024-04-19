import express from 'express';
import AuthCtrl from '../controllers/auth.controller';

const router = express.Router();
const authCtrl = new AuthCtrl();

router.route('/:email')
    .get(authCtrl.getUser);

router.route('/login')
    .post(authCtrl.login);

router.route('/register')
    .post(authCtrl.register);

export default router;
