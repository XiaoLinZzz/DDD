import { ApolloServer } from "apollo-server";
import { schema } from "./graphql/schema";
import { FruitRepository } from "./domain/repositories/FruitRepository";
import { MongooseFruitRepository } from "./infrastructure/database/mongoose/repositories/MongooseFruitRepository";
import { FruitFactory } from "./domain/factories/FruitFactory";
import { UniqueFruitNameService } from "./domain/services/UniqueFruitNameService";
import { FruitStorageService } from "./domain/services/FruitStorageService";
import mongoose from 'mongoose';


// only start listening after a successful connection to the MongoDB server.
mongoose
  .connect('mongodb://127.0.0.1:27017/test_database')
  .then(() => {
    console.log('Connected to MongoDB');

    const fruitRepository: FruitRepository = new MongooseFruitRepository();
    const fruitFactory = new FruitFactory();
    const uniqueFruitNameService = new UniqueFruitNameService(fruitRepository);

    const server = new ApolloServer({
      schema,
      context: {
        fruitStorageService: new FruitStorageService(
          fruitRepository,
          uniqueFruitNameService,
          fruitFactory
        ),
      },
    });

    server.listen().then(({ url }) => {
      console.log(`🚀 Server ready at ${url}`);
    });
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));

