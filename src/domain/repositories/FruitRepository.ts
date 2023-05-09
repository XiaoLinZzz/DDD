import { Fruit } from "../entities/Fruit";

export interface FruitRepository {
  save(fruit: Fruit): Promise<void>;
  findById(id: string): Promise<Fruit | null>;
  findByName(name: string): Promise<Fruit | null>;
  delete(id: string): Promise<void>;
}
