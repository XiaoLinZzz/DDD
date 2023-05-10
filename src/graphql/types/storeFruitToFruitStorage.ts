import { mutationField, stringArg, intArg, nonNull, booleanArg } from 'nexus'

export const storeFruitToFruitStorage = mutationField('storeFruitToFruitStorage', {
    type: 'Fruit',
    args: {
        name: nonNull(stringArg()),
        amount: nonNull(intArg()),
    },
    resolve: async (_, { name, amount }, ctx) => {
        return await ctx.fruitStorageService.storeFruit(name, amount)
    }
})