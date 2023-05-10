import { Fruit } from "../../domain/entities/Fruit";
import { Description } from "../../domain/valueObjects/Description";
import { FruitBaseDocument, FruitModel } from "../database/mongoose/models/FruitModel";

export class FruitMapper {
  public static toDomain(fruitDocument: FruitBaseDocument): Fruit {
    return new Fruit(
      fruitDocument._id,
      fruitDocument.name,
      new Description(fruitDocument.description),
      fruitDocument.limit,
      fruitDocument.amount
    );
  }

  public static toPersistence(fruit: Fruit): FruitBaseDocument {
    const fruitDoc = new FruitModel({
      _id: fruit.id,
      name: fruit.name,
      description: fruit.description,
      limit: fruit.limit,
      amount: fruit.amount,
    });

    return fruitDoc;
  }
}
