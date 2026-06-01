
import { readerClient } from "./redis"
import { writerClinet } from "./redis"
import type { payload } from "./types"

const storeResolve = new Map<string,(value:unknown)=>void>

export async function sendToStream(event:payload) {
  return new Promise(async(resolve,reject) => {
    const loopBackId = createLoopBackId(5) ?? ""
     event.loopbackid = loopBackId 
    const stringEvent = JSON.stringify(event)
    const response = await writerClinet.xAdd("to_backend", "", {stringEvent})
    storeResolve.set(loopBackId, resolve)
    setTimeout(() => {
      if (storeResolve.get(loopBackId)) {
        reject()
      }
    },10000)
  })
}

async function main() {
  while (true) {
    const response = await readerClient.xRead({ key: "from_engine", id: "$" }, {
      COUNT: 1,
      BLOCK: 100
    })
    if (!response) continue
    //@ts-ignore
    const responsePayload = JSON.parse(response[0]?.message[0])
    const message = responsePayload.message
    const fn = storeResolve.get(message.loopBackId) as (value:unknown)=>void
    if (fn) {
      fn(message.data)
    }
    storeResolve.delete(message.loopBackId)
  }
}

main()

function createLoopBackId(length: number) {
  const random = "ahsdgfjwenapjnmncvpeiuitetiglkadfmcvnbhjothpogpas"
  let result = ""
  for (let i = 0; i < length; i++){
    const index = Math.floor(Math.random() * random.length) 
    if (!random[index]) {
      return
    }
    result = result + random[index]
  }
  return result
}