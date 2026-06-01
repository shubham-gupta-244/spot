import {Router }from "express"
import { asyncHandler } from "../utils/asyncHandler"
import { OrderController } from "../src/controller/orderController"
import { authMiddleware } from "../src/controller/middleares"
const orderRouter = Router()

orderRouter.post("/order",authMiddleware, asyncHandler(OrderController))

export {orderRouter}