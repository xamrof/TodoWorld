// import { NextFunction, Request, Response } from "express";
// import { body, checkSchema } from "express-validator";
// import {emailExist, userExist} from '../helpers/db-validators'


// export const userFields = checkSchema({
//         password: {
//             isLength: {
//                 options: {min: 6},
//             },
//             errorMessage: 'minimum length is 6'
//         },
//         age: {
//             notEmpty: {bail: true},
//             isString: false,
//             isInt: true
//         },
//         email: {
//             isEmail: {bail: true},
//             custom:{
//                 options: emailExist,
//                 bail: true
//             }
//         },
//         user: {
//             notEmpty: true,
//             isString: true,
//             escape: true,
//             custom:{
//                 options: userExist,
//                 bail: true
//             }
//         }
//     })






// export const userFields = (req: Request, res: Response, next: NextFunction) => {
//         const fields = [check('password', 'the password must be longer of 6 letter').isLength({min: 5}),
//         check('age').notEmpty().isInt().not().isString(),
//         check('email').isEmail(),
//         check('email').custom(emailExist),
//         check('user').notEmpty().isString().escape(),
//         check('user').custom(userExist)]

//   next([...fields])
// } 