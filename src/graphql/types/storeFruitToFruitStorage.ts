import { mutationField, stringArg, intArg, nonNull, booleanArg } from 'nexus'

export const storeFruitToFruitStorage = mutationField('storeFruitToFruitStorage', {
    type: 'Fruit',
    args: {
        name: nonNull(stringArg()),
        amount: nonNull(intArg()),
    },
    resolve: async (_, { name, amount }, ctx) => {
        const fruit =  await ctx.fruitStorageService.storeFruit(name, amount)
        return {
            id: fruit.id,
            name: fruit.name,
            description: fruit.description.getValue(),
            limit: fruit.limit,
            amount: fruit.amount,
        }
    }
})