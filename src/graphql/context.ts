import { FruitFactory } from "../domain/factories/FruitFactory";
import { MongooseFruitRepository } from "../domain/repositories/MongooseFruitRepository";
import { UniqueFruitNameService } from "../domain/services/UniqueFruitNameService";

const fruitRepository = new MongooseFruitRepository();
const fruitFactory = new FruitFactory();
const uniqueFruitNameService = new UniqueFruitNameService(fruitRepository);

export const context = {
  fruitRepository,
  fruitFactory,
  uniqueFruitNameService,
};
