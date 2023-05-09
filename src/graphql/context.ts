import { FruitRepository } from "../domain/repositories/FruitRepository";
import { FruitFactory } from "../domain/factories/FruitFactory";
import { UniqueFruitNameService } from "../domain/services/UniqueFruitNameService";

export interface Context {
  fruitRepository: FruitRepository;
  fruitFactory: FruitFactory;
  uniqueFruitNameService: UniqueFruitNameService;
}

// Later, you'll need to initialize the context with the actual instances of these classes.
