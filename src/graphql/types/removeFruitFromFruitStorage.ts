import { mutationField, stringArg, intArg, nonNull, booleanArg } from 'nexus'

export const removeFruitFromFruitStorage = mutationField('removeFruitFromFruitStorage', {
    type: 'Fruit',
    args: {
        name: nonNull(stringArg()),
        amount: nonNull(intArg()),
    },
    resolve: async (_, { name, amount }, ctx) => {
        const fruit =  await ctx.fruitStorageService.removeFruit(name, amount)
        return {
            id: fruit.id,
            name: fruit.name,
            description: fruit.description.getValue(),
            limit: fruit.limit,
            amount: fruit.amount,
        }
    }
})
