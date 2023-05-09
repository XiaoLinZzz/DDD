import { FruitRepository } from "../repositories/FruitRepository";

export class UniqueFruitNameService {
  constructor(private fruitRepository: FruitRepository) {}

  async isUnique(name: string): Promise<boolean> {
    const fruit = await this.fruitRepository.findByName(name);
    return fruit === null;
  }
}
