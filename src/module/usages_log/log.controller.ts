import { Request, Response } from "express"
import { logServices } from "./log.service"

// Add a usage log
const addUsageLog = async (req: Request, res: Response) => {
  try {
    const payload = req.body



    const result = await logServices.addUsageLogDB(payload, req.user)

    res.status(201).json({
      success: true,
      message: "Usage log added successfully",
      data: result
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to add usage log",
      error: (error as Error).message
    })
  }
}

// Get all usage logs
const getAllUsageLogs = async (req: Request, res: Response) => {
  try {
    const logs = await logServices.getAllUsageLogsDB()
    res.status(200).json({
      success: true,
      data: logs
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to fetch usage logs",
      error: (error as Error).message
    })
  }
}
const endUsageLog = async (req: Request, res: Response) => {
  try {
    const usageLogId = req.params.id

    if (!usageLogId) {
      return res.status(400).json({
        success: false,
        message: "usageLogId is required in the URL parameter"
      })
    }

    const updatedLog = await logServices.endUsageLogDB(usageLogId)

    res.status(200).json({
      success: true,
      message: "Usage log ended successfully",
      data: updatedLog
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to end usage log",
      error: (error as Error).message
    })
  }
}



export const logControllers = {
  addUsageLog,
  getAllUsageLogs,
  endUsageLog
}
