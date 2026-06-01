import {Router} from "express"
import { asyncHandler } from "../utils/asyncHandler"
import { signupcontroller } from "../controller/atuthcontroller"
import { loginController } from "../controller/atuthcontroller"
import { it } from "zod/v4/locales"
const authRouter = Router()

authRouter.post("/signup",asyncHandler(signupcontroller))
authRouter.post("/login", asyncHandler(loginController))

export { authRouter }


