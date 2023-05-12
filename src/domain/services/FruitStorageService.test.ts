import { FruitStorageService } from '../../domain/services/FruitStorageService';
import { FruitFactory } from '../factories/FruitFactory';
import { MongooseFruitRepository } from "../../infrastructure/database/mongoose/repositories/MongooseFruitRepository";
import { UniqueFruitNameService } from './UniqueFruitNameService';
import { Fruit } from '../entities/Fruit';
import { publishEvent } from '../events/FruitDomainEventEmitter';


// Mock the FruitRepository, FruitFactory, and UniqueFruitNameService
const fruitRepository = new MongooseFruitRepository();
const fruitFactory = new FruitFactory();
const uniqueFruitNameService = new UniqueFruitNameService(fruitRepository);

// Create a FruitStorageService instance
const fruitStorageService = new FruitStorageService(
  fruitRepository,
  uniqueFruitNameService,
  fruitFactory
);

// Mock the publishEvent function
jest.mock('./events/FruitDomainEventEmitter', () => ({
  publishEvent: jest.fn(),
}));

// Test cases
describe('FruitStorageService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createFruit -> success with short description', () => {
    it('should create a fruit', async () => {
      const fruit = await fruitStorageService.createFruit('Apple', 'A fruit', 10);
      expect(fruit).toBeInstanceOf(Fruit);
    });

    it('should publish a FruitCreatedEvent', async () => {
      await fruitStorageService.createFruit('Apple', 'A fruit', 10);
      expect(publishEvent).toHaveBeenCalledTimes(1);
    });
  });

  describe('createFruit -> fail with long description', () => {
    it('should throw an error', async () => {
      await expect(
        fruitStorageService.createFruit(
          'Apple',
          'A fruit'.repeat(100),
          10
        )
      ).rejects.toThrowError();
    });

    it('should not publish a FruitCreatedEvent', async () => {
      await expect(
        fruitStorageService.createFruit(
          'Apple',
          'A fruit'.repeat(100),
          10
        )
      ).rejects.toThrowError();
      expect(publishEvent).toHaveBeenCalledTimes(0);
    });
  });
});
