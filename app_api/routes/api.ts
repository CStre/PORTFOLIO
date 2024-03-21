import express from 'express';
import ApiCtrl from '../controllers/api';

const router = express.Router();
const apiCtrl = new ApiCtrl();

router.route('/cat')
    .get(apiCtrl.getAll)
    .post(apiCtrl.addCat);

router.route('/cat/:id')
    .get(apiCtrl.getCat)
    .put(apiCtrl.updateCat)
    .delete(apiCtrl.deleteCat);

export default router;
