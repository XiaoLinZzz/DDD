import { Fruit } from "../../domain/entities/Fruit";
import { Description } from "../../domain/valueObjects/Description";
import { FruitModel } from "../database/mongoose/models/FruitModel";

export class FruitMapper {
  static toPersistence(fruit: Fruit): FruitModel {
    return new FruitModel({
      _id: fruit.id,
      name: fruit.name,
      description: fruit.description.value,
      limit: fruit.limit,
      amount: fruit.amount,
    });
  }

  static toDomain(rawFruit: FruitModel): Fruit {
    const description = Description.create(rawFruit.description);
    return Fruit.create(
      {
        id: rawFruit._id,
        name: rawFruit.name,
        description: description.getValue(),
        limit: rawFruit.limit,
        amount: rawFruit.amount,
      },
      rawFruit._id
    );
  }
}
