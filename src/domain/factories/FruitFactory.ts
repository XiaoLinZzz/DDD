import { Fruit } from "../entities/Fruit";
import { v4 as uuidv4 } from "uuid";
import { Description } from "../valueObjects/Description";

export class FruitFactory {
  create(name: string, description: string, limit: number): Fruit {
    const id = uuidv4();
    const fruitDescription = new Description(description);
    return new Fruit(id, name, fruitDescription, limit);
  }
}
