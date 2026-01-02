import { Request, Response } from "express"
import { userServices } from "./user.service"

const registerUser = async (req: Request, res: Response) => {
  const result = await userServices.registerUserDB(req.body)

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result
  })
}

const loginUser = async (req: Request, res: Response) => {
  const result = await userServices.loginUserDB(req.body)

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result
  })
}

export const userControllers = {
  registerUser,
  loginUser
}
