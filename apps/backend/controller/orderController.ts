import { z } from "zod"
import type { Request, Response } from "express"
import { prisma } from "@repo/db"
const orderparser = z.object({
  qunatity: z.number(),
  marketid: z.string(),
  prize: z.string(),
  type: z.string(),
  side: z.string(),
})
export const OrderController = async (req: Request, res: Response) => {
  const userId  = req.user?.userId
  const validbody = orderparser.safeParse(req.body)
  if (!validbody) {
    res.status(404).json({ message: "invalid form of body" })
    return
  }
  const { quantity, marketId, price, type, side } = req.body

  const createOrder = await prisma.order.create({
    data:{quantity,marketId,price,orderType:type,side,userId}
   })
  res.status(200).json({
    messgae:"order has been placed"
  })
  return 
  
  
}