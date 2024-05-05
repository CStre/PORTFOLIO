import express from 'express';
import { auth } from '../middleware/auth';
import VisitCtrl from '../controllers/visitor.controller';

const router = express.Router();
const visitCtrl = new VisitCtrl();

router.route('')
    .get(visitCtrl.getAll)
    .post(visitCtrl.addVisitor);

router.route('/:id')
    .get(visitCtrl.getVisitor)
    .put(visitCtrl.updateVisitor)
    .delete(visitCtrl.deleteVisitor);

export default router;
