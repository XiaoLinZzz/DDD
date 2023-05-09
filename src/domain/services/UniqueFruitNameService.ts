import { FruitRepository } from "../repositories/FruitRepository";

export class UniqueFruitNameService {
  constructor(private readonly fruitRepository: FruitRepository) {}

  async isUnique(name: string): Promise<boolean> {
    const existingFruit = await this.fruitRepository.findByName(name);
    return existingFruit === null;
  }
}
