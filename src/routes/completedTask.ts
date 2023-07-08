import { Router } from "express";

const router = Router();


router.get('/');
router.get('/:id');
router.post('/');
router.put('/:id')
router.delete('/:id')


module.exports = router