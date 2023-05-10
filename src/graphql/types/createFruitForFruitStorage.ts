import { mutationField, stringArg, intArg, nonNull } from 'nexus'

export const createFruitForFruitStorage = mutationField('createFruitForFruitStorage', {
    type: 'Fruit',
    args: {
        name: nonNull(stringArg()),
        description: nonNull(stringArg()),
        limit: nonNull(intArg()),
    },
    resolve: async (_, { name, description, limit }, ctx) => {
        return await ctx.fruitStorageService.createFruit(name, description, limit)
    },
})
