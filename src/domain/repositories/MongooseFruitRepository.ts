import mongoose from 'mongoose';
import { Fruit } from "../entities/Fruit";
import { FruitRepository } from "./FruitRepository";

// Create a Mongoose schema for the Fruit entity
const FruitSchema = new mongoose.Schema({
  name: String,
  description: String,
  limit: Number,
  amount: Number,
});

// Create a Mongoose model for the Fruit entity
const FruitModel = mongoose.model('Fruit', FruitSchema);

export class MongooseFruitRepository implements FruitRepository {
  async findById(id: string): Promise<Fruit | null> {
    const fruit = await FruitModel.findById(id);
    if (fruit) {
      return new Fruit(fruit.id, fruit.name, fruit.description, fruit.limit, fruit.amount);
    }
    return null;
  }

  async findByName(name: string): Promise<Fruit | null> {
    const fruit = await FruitModel.findOne({ name });
    if (fruit) {
      return new Fruit(fruit.id, fruit.name, fruit.description, fruit.limit, fruit.amount);
    }
    return null;
  }

  async save(fruit: Fruit): Promise<void> {
    const existingFruit = await FruitModel.findById(fruit.id);

    if (existingFruit) {
      existingFruit.name = fruit.name;
      existingFruit.description = fruit.description;
      existingFruit.limit = fruit.limit;
      existingFruit.amount = fruit.amount;
      await existingFruit.save();
    } else {
      const newFruit = new FruitModel({
        name: fruit.name,
        description: fruit.description,
        limit: fruit.limit,
        amount: fruit.amount,
      });
      await newFruit.save();
    }
  }

  async delete(id: string): Promise<void> {
    await FruitModel.findByIdAndDelete(id);
  }
}
