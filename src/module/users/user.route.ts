import { Router } from "express"
import { userControllers } from "./user.controller"

const router = Router()

router.post("/register", userControllers.registerUser)
router.post("/login", userControllers.loginUser)

export const userRouter = router
