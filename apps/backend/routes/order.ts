import {Router }from "express"
import { asyncHandler } from "../utils/asyncHandler"
import { OrderController } from "../controller/orderController"
const orderRouter = Router()

orderRouter.post("/order", asyncHandler(OrderController))

export {orderRouter}