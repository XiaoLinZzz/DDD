import { mutationField, stringArg, intArg, nonNull, booleanArg } from 'nexus'

export const deleteFruitFromFruitStorage = mutationField('deleteFruitFromFruitStorage', {
    type: 'Fruit',
    args: {
        name: nonNull(stringArg()),
        forceDelete: nonNull(booleanArg()),
    },
    resolve: async (_, { name, forceDelete }, ctx) => {
        const fruit =  await ctx.fruitStorageService.deleteFruit(name, forceDelete)
        return {
            id: fruit.id,
            name: fruit.name,
            description: fruit.description.getValue(),
            limit: fruit.limit,
            amount: fruit.amount,
        }
    }
})
