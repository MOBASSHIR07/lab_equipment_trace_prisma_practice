import { Router } from "express"
import { equipmentControllers } from "./equipment.controller"

const router = Router()

// Add equipment
router.post("/add", equipmentControllers.addEquipment)

// Get all equipment
router.get("/all", equipmentControllers.getAllEquipment)

export const equipmentRouter = router
