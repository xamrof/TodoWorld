import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { UserController } from "../controllers/user.controller";
import { check } from "express-validator";
import { emailExist, userExist, userNotExist } from "../helpers/db-validators";
import { validateFields } from "../middlewares/validateFields";

const router = Router();


router.post('/register',[
    check('password', 'the password must be longer of 6 letter').isLength({min: 5}),
    check('age', 'the age not empty and not string').notEmpty().isInt().not().isString(),
    check('email', 'not a valid email').isEmail(),
    check('email').custom(emailExist),
    check('user','the user do not have empty').notEmpty().isString().escape(),
    check('user').custom(userExist),
    validateFields
], UserController.instance.create)
router.post('/login',[
    check('user','the user do not have empty').notEmpty().isString().escape(),
    check('user').custom(userNotExist),
    check('password', 'the password is not a string').isString(),
    check('password', 'the password is not a string').notEmpty(),
    validateFields
], AuthController.instance.loginUser)


export default router