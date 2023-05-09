import { Fruit } from "../../domain/entities/Fruit";
import { Description } from "../../domain/valueObjects/Description";
import { FruitBaseDocument, FruitModel } from "../database/mongoose/models/FruitModel";

export class FruitMapper {
  public static toDomain(fruitDocument: FruitBaseDocument): Fruit {
    return new Fruit({
      _id: fruitDocument._id,
      name: fruitDocument.name,
      description: new Description(fruitDocument.description),
      limit: fruitDocument.limit,
      amount: fruitDocument.amount,
    });
  }

  public static toPersistence(fruit: Fruit): FruitBaseDocument {
    const fruitDoc = new FruitModel({
      _id: fruit.id,
      name: fruit.name,
      description: fruit.description.value,
      limit: fruit.limit,
      amount: fruit.amount,
    });

    return fruitDoc;
  }
}
