import { mutationField, stringArg, intArg, nonNull, booleanArg } from 'nexus'

export const deleteFruitFromFruitStorage = mutationField('deleteFruitFromFruitStorage', {
    type: 'Fruit',
    args: {
        name: nonNull(stringArg()),
        forceDelete: nonNull(booleanArg()),
    },
    resolve: async (_, { name, forceDelete }, ctx) => {
        return await ctx.fruitStorageService.deleteFruit(name, forceDelete)
    }
})
