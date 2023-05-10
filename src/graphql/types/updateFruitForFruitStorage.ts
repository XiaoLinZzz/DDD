import { mutationField, stringArg, intArg, nonNull, booleanArg } from 'nexus'

export const updateFruitForFruitStorage = mutationField('updateFruitForFruitStorage', {
    type: 'Fruit',
    args: {
        name: nonNull(stringArg()),
        description: nonNull(stringArg()),
        limit: nonNull(intArg()),
    },
    resolve: async (_, { name, description, limit }, ctx) => {
        const fruit =  await ctx.fruitStorageService.updateFruit(name, description, limit)
        return {
            id: fruit.id,
            name: fruit.name,
            description: fruit.description.getValue(),
            limit: fruit.limit,
            amount: fruit.amount,
        }
    }
})


