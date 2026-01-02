import { Request, Response } from "express"
import { equipmentServices } from "./equipment.service"

// Add new equipment
const addEquipment = async (req: Request, res: Response) => {
  try {
    const payload = req.body

    if (!payload.name || !payload.serialNumber || !payload.location) {
      return res.status(400).json({
        success: false,
        message: "name, serialNumber and location are required"
      })
    }

    const result = await equipmentServices.addEquipmentDB(payload)

    res.status(201).json({
      success: true,
      message: "Equipment added successfully",
      data: result
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to add equipment",
      error: (error as Error).message
    })
  }
}

// Get all equipment
const getAllEquipment = async (req: Request, res: Response) => {
  try {
    const equipments = await equipmentServices.getAllEquipmentDB()
    res.status(200).json({
      success: true,
      data: equipments
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch equipment",
      error: (error as Error).message
    })
  }
}

export const equipmentControllers = {
  addEquipment,
  getAllEquipment
}
