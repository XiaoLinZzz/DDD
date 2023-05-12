import { Fruit } from '../entities/Fruit';
import { FruitFactory } from '../factories/FruitFactory';
import { FruitRepository } from '../repositories/FruitRepository';
import { UniqueFruitNameService } from './UniqueFruitNameService';
import { publishEvent } from '../events/FruitDomainEventEmitter';

export class FruitStorageService {
    constructor(
        private fruitRepository: FruitRepository,
        private uniqueFruitNameService: UniqueFruitNameService,
        private fruitFactory: FruitFactory
    ) {}

    async createFruit(name: string, description: string, limit: number): Promise<Fruit> {
        const isUnique = await this.uniqueFruitNameService.isUnique(name);
        if (!isUnique) {
            throw new Error('Fruit name already exists');
        }
        const fruit = this.fruitFactory.create(name, description, limit);
        await this.fruitRepository.save(fruit);

        publishEvent(fruit.id, 'fruitCreated', fruit);

        return fruit;
    }

    async findFruit(name: string): Promise<Fruit | null> {
        return this.fruitRepository.findByName(name);
    }

    async deleteFruit(name: string, forceDelete: boolean): Promise<void> {
        const fruit = await this.fruitRepository.findByName(name);
        if (!fruit) {
            throw new Error('Fruit not found');
        }
        if (!forceDelete && fruit.amount > 0) {
            throw new Error('Fruit has stock. Cannot delete');
        }

        publishEvent(fruit.id, 'fruitDeleted', fruit);
        await this.fruitRepository.delete(fruit.id);
    }

    async removeFruit(name: string, amount: number): Promise<Fruit> {
        const fruit = await this.fruitRepository.findByName(name);
        if (!fruit) {
            throw new Error('Fruit not found');
        }
        fruit.remove(amount);
        await this.fruitRepository.save(fruit);

        return fruit;
    }

    async storeFruit(name: string, amount: number): Promise<Fruit> {
        const fruit = await this.fruitRepository.findByName(name);
        if (!fruit) {
            throw new Error('Fruit not found');
        }
        fruit.store(amount);
        await this.fruitRepository.save(fruit);
        return fruit;
    }

    async updateFruit(name: string, description: string, limit: number): Promise<Fruit> {
        const fruit = await this.fruitRepository.findByName(name);
        if (!fruit) {
            throw new Error('Fruit not found');
        }
        fruit.update(description, limit);
        await this.fruitRepository.save(fruit);

        publishEvent(fruit.id, 'fruitUpdated', fruit);
        return fruit;
    }
}

