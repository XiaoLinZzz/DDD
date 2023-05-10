import { mutationField, stringArg, intArg, nonNull, booleanArg } from 'nexus'

export const removeFruitFromFruitStorage = mutationField('removeFruitFromFruitStorage', {
    type: 'Fruit',
    args: {
        name: nonNull(stringArg()),
        amount: nonNull(intArg()),
    },
    resolve: async (_, { name, amount }, ctx) => {
        return await ctx.fruitStorageService.removeFruit(name, amount)
    }
})
