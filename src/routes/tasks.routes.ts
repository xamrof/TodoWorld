import { Router } from "express";
import { TaskController } from "../controllers/task";

const router = Router();


router.get('/', TaskController.instance.getTasks);
router.get('/:taskId', TaskController.instance.getTask);
router.post('/', TaskController.instance.create);
router.put('/:taskId', TaskController.instance.updated)
router.delete('/:taskId', TaskController.instance.delete)


export default router