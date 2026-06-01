import { createClient } from "redis";
export const eventReciever = createClient()
export const responseWriter = createClient()

await eventReciever.connect()
await responseWriter.connect()