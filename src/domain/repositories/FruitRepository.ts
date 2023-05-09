import { Fruit } from "../entities/Fruit";

export interface FruitRepository {
  findById(id: string): Promise<Fruit | null>;
  findByName(name: string): Promise<Fruit | null>;
  save(fruit: Fruit): Promise<void>;
  delete(id: string): Promise<void>;
}
