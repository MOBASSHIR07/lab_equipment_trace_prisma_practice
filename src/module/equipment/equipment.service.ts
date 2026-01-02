import { prisma } from "../../lib/prisma"

interface CreateEquipmentPayload {
  name: string
  serialNumber: string
  location: string
  status?: "Available" | "In_use" | "Maintance"
  metaData?: any
}

const addEquipmentDB = async (payload: CreateEquipmentPayload) => {
  const equipment = await prisma.equipment.create({
    data: payload,
  })
  return equipment
}

const getAllEquipmentDB = async () => {
  const equipments = await prisma.equipment.findMany({
      orderBy : {
        createdAt:"desc"
      }
  })
  return equipments
}

export const equipmentServices = {
  addEquipmentDB,
  getAllEquipmentDB
}
