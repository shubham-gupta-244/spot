declare global{
  namespace Express{
    interface Request{
      user ? :JwtPayload | {userId:string} 
    }
  }
}
import express from "express"
import cors from "cors"
import { authRouter } from "./routes/auth"
import { orderRouter } from "./routes/order"
import type { unknown } from "zod/v3"
import type { JwtPayload } from "jsonwebtoken"
const app = express()

app.use(express.json())
app.use(cors())

app.use(authRouter)
app.use(orderRouter)

app.listen(3000, () => {
  console.log("server is running on port 3000")
})