import bcrypt from "bcryptjs"
import { prisma } from "../../lib/prisma"
import jwt from 'jsonwebtoken'
const registerUserDB = async (payload: any) => {
  // hash password
  const hashedPassword = await bcrypt.hash(payload.password, 10)

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: payload.role // optional
    }
  })

  // remove password before returning
  const { password, ...safeUser } = user
  return safeUser
}

const loginUserDB = async (payload: any) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email }
  })

  if (!user) {
    throw new Error("User not found")
  }

  const isPasswordMatch = await bcrypt.compare(
    payload.password,
    user.password
  )

  if (!isPasswordMatch) {
    throw new Error("Invalid credentials")
  }
 
  const token = await jwt.sign({id:user.id, role:user.role}, 'very_secret', {expiresIn:'7d'})

  const { password, ...safeUser } = user
  return {user:safeUser , token}
}

export const userServices = {
  registerUserDB,
  loginUserDB
}
