import { mutationField, stringArg, intArg, nonNull } from 'nexus'

export const createFruitForFruitStorage = mutationField('createFruitForFruitStorage', {
    type: 'Fruit',
    args: {
        name: nonNull(stringArg()),
        amount: nonNull(intArg()),
        limit: nonNull(intArg()),
    },
    resolve: async (_, { name, amount, limit }, ctx) => {
        return await ctx.fruitStorageService.createFruit(name, amount, limit)
    },
})