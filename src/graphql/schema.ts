import { makeSchema, objectType, nonNull } from "nexus";
import { Fruit } from "../domain/entities/Fruit";

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
            resolve: async (_parent, { name }, { fruitRepository }) => {
                return await fruitRepository.findByName(name);
            },
        });
    },
});

const Mutation = objectType({
    name: "Mutation",
    definition(t) {
        t.field("createFruitForFruitStorage", {
            type: "Fruit",
            args: {
                name: nonNull("String"),
                description: nonNull("String"),
                limit: nonNull("Int"),
            },
            resolve: async (_parent, { name, description, limit }, { fruitFactory, fruitRepository, uniqueFruitNameService }) => {
                if (!(await uniqueFruitNameService.isUnique(name))) {
                    throw new Error("Fruit name must be unique");
                }

                const fruit = fruitFactory.create(name, description, limit);
                await fruitRepository.save(fruit);
                return fruit;
            },
        });

        t.field("removeFruitFromFruitStorage", {
            type: "Fruit",
            args: {
                name: nonNull("String"),
                amount: nonNull("Int"),
            },
            resolve: async (_parent, { name, amount }, { fruitRepository }) => {
                const fruit = await fruitRepository.findByName(name);
                fruit.remove(amount);
                await fruitRepository.save(fruit);
                return fruit;
            },
        });

        t.field("updateFruitForFruitStorage", {
            type: "Fruit",
            args: {
                name: nonNull("String"),
                description: nonNull("String"),
                limit: nonNull("Int"),
            },
            resolve: async (_parent, { name, description, limit }, { fruitRepository }) => {
                const fruit = await fruitRepository.findByName(name);
                fruit.update(description, limit);
                await fruitRepository.save(fruit);
                return fruit;
            },
        });

        t.field("deleteFruitFromFruitStorage", {
            type: "Fruit",
            args: {
                name: nonNull("String"),
                forceDelete: nonNull("Boolean"),
            },
            resolve: async (_parent, { name, forceDelete }, { fruitRepository }) => {
                const fruit = await fruitRepository.findByName(name);
                if (forceDelete) {
                    await fruitRepository.delete(fruit.id);
                } else {
                    if (fruit.amount === 0) {
                        await fruitRepository.delete(fruit.id);
                    } else {
                        throw new Error("Cannot delete fruit with remaining stock");
                    }
                }
                return fruit;
            },
        });

    },
});

export const schema = makeSchema({
    types: [FruitType, Query, Mutation],
    outputs: {
        schema: __dirname + "/../generated/schema.graphql",
        typegen: __dirname + "/../generated/nexus.ts",
    },
});
