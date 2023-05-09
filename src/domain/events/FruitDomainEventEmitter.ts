import { EventEmitter } from "events";
import { Fruit } from "../entities/Fruit";

export class FruitDomainEventEmitter extends EventEmitter {}

const fruitDomainEventEmitter = new FruitDomainEventEmitter();

fruitDomainEventEmitter.on("fruitCreated", (fruit: Fruit) => {
  console.log("Fruit created:", fruit);
});

export { fruitDomainEventEmitter };
