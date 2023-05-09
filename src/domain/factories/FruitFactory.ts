import { Fruit } from "../entities/Fruit";
import { Description } from "../valueObjects/Description";

export class FruitFactory {
  static create(id: string, name: string, description: string, limit: number, amount: number): Fruit {
    const fruitDescription = new Description(description);
    return new Fruit(id, name, fruitDescription, limit, amount);
  }
}
