import express from "express"
import cors from "cors"
import { userRouter } from "./module/users/user.route";
import { equipmentRouter } from "./module/equipment/equipment.route";
import { logRouter } from "./module/usages_log/log.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";


const app = express();


app.use(express.json())
app.use(cors())

app.use("/api/auth", toNodeHandler(auth));


app.use("/user", userRouter)
app.use("/equipment", equipmentRouter)
app.use("/usage_logs", logRouter)

export default app