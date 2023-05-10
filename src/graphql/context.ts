import { FruitRepository } from '../domain/repositories/FruitRepository';
import { FruitFactory } from '../domain/factories/FruitFactory';
import { UniqueFruitNameService } from '../domain/services/UniqueFruitNameService';
import { FruitStorageService } from '../domain/services/FruitStorageService';
import { MongooseFruitRepository } from '../infrastructure/database/mongoose/repositories/MongooseFruitRepository';

export interface Context {
  fruitRepository: FruitRepository;
  fruitFactory: FruitFactory;
  uniqueFruitNameService: UniqueFruitNameService;
  fruitStorageService: FruitStorageService;
}

const fruitRepository: FruitRepository = new MongooseFruitRepository();
const fruitFactory = new FruitFactory();
const uniqueFruitNameService = new UniqueFruitNameService(fruitRepository);
const fruitStorageService = new FruitStorageService(fruitRepository, uniqueFruitNameService, fruitFactory);

export const createContext = (): Context => {
  return {
    fruitRepository,
    fruitFactory,
    uniqueFruitNameService,
    fruitStorageService,
  };
};
