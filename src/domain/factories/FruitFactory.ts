import { Fruit } from "../entities/Fruit";
import { v4 as uuidv4 } from "uuid";

export class FruitFactory {
  create(name: string, description: string, limit: number): Fruit {
    const id = uuidv4();
    return new Fruit(id, name, description, limit);
  }
}
