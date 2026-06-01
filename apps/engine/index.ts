import { eventReciever } from "./utils/reids";

async function main() {
  while (true) {
    const recievedEvent = await eventReciever.xRead({ key: "to_engine", id: "$" }, { COUNT: 1, BLOCK: 100 })
    if (!recievedEvent) continue
    const event = JSON.stringify(recievedEvent)
    switch(event.type)
  }
}