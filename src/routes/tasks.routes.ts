import { Router } from "express";
import { TaskController } from "../controllers/task";

const router = Router();


router.get('/:id', TaskController.instance.getTasks);
router.get('/:id', TaskController.instance.getTask);
router.post('/', TaskController.instance.create);
router.put('/:id', TaskController.instance.updated)
router.delete('/:id', TaskController.instance.delete)


export default router