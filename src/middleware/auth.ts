import { NextFunction, Request, Response } from "express"
// import { Role } from "../generated/prisma/enums"
import jwt, { JwtPayload } from 'jsonwebtoken'
import { auth as betterAuth } from '../lib/auth'
import { adminRole, userRole } from "../lib/permissions";
import { rolesMap } from "../lib/permissions";


declare global {
    namespace Express {
        interface Request {
            user: JwtPayload
        }
    }
}

interface Role {

}// did for better auth

type Resource = "user" | "equipment";
type Action = "create" | "read" | "update" | "delete";
const auth = (resource: Resource, action: Action) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // const token = req.headers.authorization?.split(" ")[1]

        // if (!token) {
        //     return res.send("Please privide token")
        // }

        // try {
        //     const decode = jwt.verify(token as string, "very_secret")

        //     if (!decode) {
        //         return res.send("Unauthoried")
        //     }

        //     req.user = decode as JwtPayload

        //     if (role.length && !role.includes(req.user.role)) {
        //         return res.status(403).json({ message: "Forbidden: insufficient role" })
        //     }
        // ******************************************************************************

        // better auth

        try {
            const session = await betterAuth.api.getSession({
                headers: req.headers,
            })
            console.log(session);


            if (!session) {
                return res.status(401).json({
                    success: false,
                    message: "You are not authorized",
                });
            }




            // const role = rolesMap[session.user.role as keyof typeof rolesMap];
            // if (!role) {
            //     return res.status(403).json({
            //         message: "Forbidden: Unknown role",
            //     });
            // }

            const allowed = await betterAuth.api.userHasPermission({
                headers: req.headers,
                body: {
                    permissions: {
                        [resource]: [action],
                    },
                },
            });



            if (!allowed.success) {
                return res.status(403).json({
                    message: "Forbidden: Access Denied",
                });
            }



            // Attach user for the next function (the controller)
            req.user = session.user;


            next()

        } catch (error: any) {
            console.log(error);
        }
    }
}
export default auth