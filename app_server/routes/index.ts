import { Router } from 'express';
import IndexController from '../controllers/index.controller';

const router = Router();
const indexController = new IndexController();

/* GET home page. */
router.get('/', indexController.home);

export default router;
