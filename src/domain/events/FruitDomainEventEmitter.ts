// domain/events/FruitDomainEventEmitter.ts
import { EventEmitter } from "events";
import { Fruit } from "../entities/Fruit";
import * as cron from "node-cron";

class FruitDomainEventEmitter extends EventEmitter {}

const fruitEventEmitter = new FruitDomainEventEmitter();

fruitEventEmitter.on("fruitCreated", (fruit: Fruit) => {
  console.log(`A new fruit has been created: ${fruit.name}`);
});

fruitEventEmitter.on("fruitUpdated", (fruit: Fruit) => {
  console.log(`A fruit has been updated: ${fruit.name}`);
});

fruitEventEmitter.on("fruitDeleted", (fruit: Fruit) => {
  console.log(`A fruit has been deleted: ${fruit.name}`);
});

// The transactional outbox pattern with node-cron to guarantee at least once delivery
const outbox = new Map<string, { eventName: string; fruit: Fruit }>();

const publishEvent = (id: string, eventName: string, fruit: Fruit) => {
  outbox.set(id, { eventName, fruit });
};

const processOutbox = () => {
  outbox.forEach((value, key) => {
    const { eventName, fruit } = value;
    fruitEventEmitter.emit(eventName, fruit);
    outbox.delete(key);
  });
};

// Schedule the outbox processing every minute
cron.schedule("* * * * *", processOutbox);

export { fruitEventEmitter, publishEvent };

