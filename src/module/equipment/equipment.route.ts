// import { Router } from "express"
// import { equipmentControllers } from "./equipment.controller"

// const router = Router()

// // Add equipment
// router.post("/add", equipmentControllers.addEquipment)

// // Get all equipment
// router.get("/all", equipmentControllers.getAllEquipment)

// export const equipmentRouter = router


/// better auth
import { Router } from "express"
import { equipmentControllers } from "./equipment.controller"
import auth from "../../middleware/auth" // Import the middleware you just finished

const router = Router()

// 1. Add equipment (Only roles with "create" on "equipment" can pass)
router.post(
    "/add", 
    auth("equipment", "create"), 
    equipmentControllers.addEquipment
)

// 2. Get all equipment (Roles with "read" on "equipment" can pass)
router.get(
    "/all", 
    auth("equipment", "read"), 
    equipmentControllers.getAllEquipment
)

export const equipmentRouter = router