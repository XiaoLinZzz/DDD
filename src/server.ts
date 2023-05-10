import { ApolloServer } from "apollo-server";
import { schema } from "./graphql/schema";
import { FruitRepository } from "./domain/repositories/FruitRepository";
import { MongooseFruitRepository } from "./infrastructure/database/mongoose/repositories/MongooseFruitRepository";
import { FruitFactory } from "./domain/factories/FruitFactory";
import { UniqueFruitNameService } from "./domain/services/UniqueFruitNameService";
import { FruitStorageService } from "./domain/services/FruitStorageService";

// Set up your database connection here (e.g., with Mongoose)
const mongoose = require('mongoose');


const fruitRepository: FruitRepository = new MongooseFruitRepository(); // Make sure you pass the Mongoose model to the repository
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
