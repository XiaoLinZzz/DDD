import { mutationField, stringArg, intArg, nonNull } from 'nexus'

export const createFruitForFruitStorage = mutationField('createFruitForFruitStorage', {
    type: 'Fruit',
    args: {
        name: nonNull(stringArg()),
        description: nonNull(stringArg()),
        limit: nonNull(intArg()),
    },
    resolve: async (_, { name, description, limit }, ctx) => {
        const fruit =  await ctx.fruitStorageService.createFruit(name, description, limit)
        return {
            id: fruit.id,
            name: fruit.name,
            description: fruit.description.getValue(),
            limit: fruit.limit,
            amount: fruit.amount,
        }
    },
})
