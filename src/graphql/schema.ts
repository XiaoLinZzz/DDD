import { makeSchema, objectType, nonNull } from "nexus";
import { Fruit } from "../domain/entities/Fruit";
import { Context } from "./context";

const FruitType = objectType({
  name: "Fruit",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("description");
    t.int("limit");
    t.int("amount");
  },
});

const Query = objectType({
  name: "Query",
  definition(t) {
    t.field("findFruit", {
      type: "Fruit",
      args: {
        name: nonNull("String"),
      },
      resolve: async (_parent, { name }, ctx: Context) => {
        return await ctx.fruitRepository.findByName(name);
      },
    });
  },
});

// Add your Mutation and other object types here.

export const schema = makeSchema({
  types: [FruitType, Query], // Add Mutation and other object types here.
  contextType: {
    module: require.resolve("./context"),
    export: "Context",
  },
  outputs: {
    schema: __dirname + "/../generated/schema.graphql",
    typegen: __dirname + "/../generated/nexus.ts",
  },
});
