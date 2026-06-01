import { z } from "zod"
import type { Request, Response } from "express"
import { prisma } from "@repo/db"
import { sendToStream } from "../utils/sendToStream"
const orderparser = z.object({
  qunatity: z.number(),
  marketId: z.string(),
  prize: z.string(),
  ordertype: z.string(),
  side: z.string(),
})
export const OrderController = async (req: Request, res: Response) => {
  const userId  = req.user?.userId
  const validbody = orderparser.safeParse(req.body)
  if (!validbody) {
    res.status(404).json({ message: "invalid form of body" })
    return
  }
  const { quantity, marketId, price, ordertype, side } = req.body

  const createOrder = await prisma.order.create({
    data:{quantity,marketId,price,orderType:ordertype,side,userId}
   })

  const response = await sendToStream({type:"create_order",data:{marketId,userId,price,ordertype,quantity,side}})
  if (!response) {
  res.status(404).json({message:"did not recieve the response after sending to engine"})
  }
  res.status(200).json({
    messgae: "order has been placed",
    response
  })
  return 
  
  
}