import { prisma } from "../../lib/prisma"

interface CreateUsageLogPayload {
  userId: string
  equipmentId: string
  startTime: string 
  endTime?: string 
  purpose: string
  notes?: string
}

const addUsageLogDB = async (payload: CreateUsageLogPayload, user:any) => {
  const log = await prisma.usageLog.create({
    data: {
      userId: user.id,
      equipmentId: payload.equipmentId,
      startTime: new Date(payload.startTime),
      endTime: payload.endTime ? new Date(payload.endTime) : null,
      purpose: payload.purpose,
      notes: payload.notes || null
    }
  })
  return log
}

const getAllUsageLogsDB = async () => {
  const logs = await prisma.usageLog.findMany({
    include: {
      user: true,
      equipment: true
    },
    orderBy: { createdAt: "desc" }
  })
  return logs
}

const endUsageLogDB = async (usageLogId: string) => {
  const log = await prisma.usageLog.update({
    where: { id: usageLogId },
    data: {
      endTime: new Date()
    },
    include: { user: true, equipment: true }
  })
  return log
}

export const logServices = {
  addUsageLogDB,
  getAllUsageLogsDB,
  endUsageLogDB
}
