import { NextFunction, Request, Response } from "express"
import { Role } from "../generated/prisma/enums"
import jwt, { JwtPayload } from 'jsonwebtoken'

declare global {
    namespace Express {
        interface Request {
            user: JwtPayload
        }
    }
}

const auth = (...role: Role[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.send("Please privide token")
        }

        try {
            const decode = jwt.verify(token as string, "very_secret")

            if (!decode) {
                return res.send("Unauthoried")
            }

            req.user = decode as JwtPayload

            if (role.length && !role.includes(req.user.role)) {
                return res.status(403).json({ message: "Forbidden: insufficient role" })
            }

            next()

        } catch (error) {

        }
    }
}
export default auth