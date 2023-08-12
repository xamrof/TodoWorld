import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { check} from "express-validator";
import {emailExist, userExist, userByIdExist} from '../helpers/db-validators'
import { validateFields } from "../middlewares/validateFields";
import { isValidId } from "../helpers/idValidator";
// import { userFields } from "../middlewares/userFields";

const router = Router();


router.get('/', UserController.instance.getUsers);
router.get('/:id',[
    check('id', 'The id not is a valid number').isInt(),
    check('id').custom(userByIdExist),
    validateFields,
    // invalidId
],UserController.instance.getUser);
router.post('/',[
    check('password', 'the password must be longer of 6 letter').isLength({min: 5}).notEmpty(),
    check('age', 'the age not empty and not string').notEmpty().isInt().not().isString(),
    check('email', 'not a valid email').isEmail().notEmpty(),
    check('email', 'the email exist').custom(emailExist),
    check('user','the user do not have empty').notEmpty().isString().escape(),
    check('user', 'a user with this name exist').custom(userExist),
    validateFields
 ],UserController.instance.create);
router.put('/:id',[
    check('id').isInt(),
    check('id').custom(userByIdExist),
    validateFields
], UserController.instance.updated);
router.delete('/:id',[
    check('id').isInt(),
    check('id').custom(userByIdExist),
    validateFields
], UserController.instance.delete);





export default router;
