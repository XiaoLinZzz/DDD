import { EventEmitter } from "events";
import { Fruit } from "../entities/Fruit";

class FruitDomainEventEmitter extends EventEmitter {}

const fruitEventEmitter = new FruitDomainEventEmitter();

fruitEventEmitter.on("fruitCreated", (fruit: Fruit) => {
  console.log(`A new fruit has been created: ${fruit.name}`);
});

export { fruitEventEmitter };
