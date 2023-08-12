import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields";
import { checkJwt } from "../middlewares/checkjwt";

const router = Router();

router.get('/',[
    checkJwt,
    validateFields
], TaskController.instance.getTasks);
router.get('/:taskId',[
    checkJwt,
    validateFields
], TaskController.instance.getTask)
router.post('/',[
    checkJwt,
    check('title', 'Title is Required').isString().isLength({max: 40}).notEmpty(),
    check('description').isString(),
    check('priority').isString().notEmpty(),
    validateFields], TaskController.instance.create);
router.put('/:taskId',[
    checkJwt,
    validateFields
], TaskController.instance.updated)
router.delete('/:taskId',[checkJwt, validateFields], TaskController.instance.delete)


export default router