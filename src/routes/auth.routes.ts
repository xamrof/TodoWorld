import { Router } from "express";
import { AuthController } from "../controllers/auth";
import { UserController } from "../controllers/user";
import { check } from "express-validator";
import { emailExist, userExist } from "../helpers/db-validators";
import { validateFields } from "../middlewares/validateFields";

const router = Router();


router.post('/register',[
    check('password', 'the password must be longer of 6 letter').isLength({min: 5}),
    check('age', 'the age not empty and not string').notEmpty().isInt().not().isString(),
    check('email', 'not a valid email').isEmail(),
    check('email', 'the email exist').custom(emailExist),
    check('user','the user do not have empty').notEmpty().isString().escape(),
    check('user', 'a user with this name exist').custom(userExist),
    validateFields
], UserController.instance.create)
router.post('/login', AuthController.instance.loginUser)


export default router