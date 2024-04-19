import express from 'express';
import CatCtrl from '../controllers/cat.controller';

const router = express.Router();
const catCtrl = new CatCtrl();

router.route('')
    .get(catCtrl.getAll)
    .post(catCtrl.addCat);

router.route('/:id')
    .get(catCtrl.getCat)
    .put(catCtrl.updateCat)
    .delete(catCtrl.deleteCat);

export default router;
