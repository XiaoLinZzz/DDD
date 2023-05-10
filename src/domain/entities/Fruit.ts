import { fruitEventEmitter } from "../events/FruitDomainEventEmitter";
import { Description } from "../valueObjects/Description";

export class Fruit {
    constructor(
      public id: string,
      public name: string,
      public description: string,
      public limit: number,
      public amount: number = 0
    ) {}
  
    add(amount: number): void {
      this.amount += amount;
    }
  
    remove(amount: number): void {
      if (this.amount < amount) {
        throw new Error("Insufficient stock");
      }
      this.amount -= amount;
    }
  
    update(description: string, limit: number): void {
      this.description = description;
      this.limit = limit;
    }

    emitCreatedEvent(): void {
      fruitEventEmitter.emit("fruitCreated", this);
    }

    emitUpdatedEvent(): void {
      fruitEventEmitter.emit("fruitUpdated", this);
    }

    emitDeletedEvent(): void {
      fruitEventEmitter.emit("fruitDeleted", this);
    }
}
  