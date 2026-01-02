import { Router } from "express"
import { logControllers } from "./log.controller"
import auth from "../../middleware/auth"
import { Role } from "../../generated/prisma/enums"

const router = Router()

// Add a usage log
router.post("/add", auth(Role.Admin), logControllers.addUsageLog)

// Get all usage logs
router.get("/all", logControllers.getAllUsageLogs)
// End a usage log by ID (Admin only)
router.patch("/end/:id", auth(Role.Student), logControllers.endUsageLog)


export const logRouter = router
