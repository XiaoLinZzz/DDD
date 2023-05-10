import { Fruit } from "../../../../domain/entities/Fruit";
import { FruitRepository } from "../../../../domain/repositories/FruitRepository";
import { FruitModel } from "../../../database/mongoose/models/FruitModel";
import { FruitMapper } from "../../../mappers/FruitMapper";

export class MongooseFruitRepository implements FruitRepository {
  

  async findById(id: string): Promise<Fruit | null> {
    const rawFruit = await FruitModel.findById(id);
    if (!rawFruit) {
      return null;
    }
    return FruitMapper.toDomain(rawFruit);
  }

  async findByName(name: string): Promise<Fruit | null> {
    const rawFruit = await FruitModel.findOne({ name }).maxTimeMS(20000);
    if (!rawFruit) {
      return null;
    }
    return FruitMapper.toDomain(rawFruit);
  }

  async save(fruit: Fruit): Promise<void> {
    const fruitModel = FruitMapper.toPersistence(fruit);
    await fruitModel.save();
  }

  async delete(id: string): Promise<void> {
    await FruitModel.findByIdAndDelete(id);
  }
}
