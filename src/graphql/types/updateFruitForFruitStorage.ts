import { mutationField, stringArg, intArg, nonNull, booleanArg } from 'nexus'

export const updateFruitForFruitStorage = mutationField('updateFruitForFruitStorage', {
    type: 'Fruit',
    args: {
        name: nonNull(stringArg()),
        description: nonNull(stringArg()),
        limit: nonNull(intArg()),
    },
    resolve: async (_, { name, description, limit }, ctx) => {
        return await ctx.fruitStorageService.updateFruit(name, description, limit)
    }
})


