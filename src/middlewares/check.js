import Errorss from "../service/error/errors.js"
import CustomError from "../utils/customError.js"
import {userService} from "../service/index.js"
import generateUserError from "../utils/generateUserError.js"
async function check(req, res, next) {
    try {
        let { first_name, last_name, password, mail, age } = req.body
        if (!first_name || !last_name || !password || !mail || !age) {
            CustomError.createError({ name: "Register error", cause: JSON.stringify(generateUserError(first_name, last_name, mail, age)), message: "Error registering user", code: Errorss.PARAMS_MISSING_ERROR })
        }
        else {
            let user = await userService.findOne({mail:req.body.mail})
            if (!user) {
                next()
            }
            else {
                CustomError.createError({ name: "Register error", cause: "Email already exists", message: "Error registering user", code: Errorss.INVALID_TYPE_ERROR })
            }
        }
    }
    catch (e) {
        next(e)
    }
}
export default check