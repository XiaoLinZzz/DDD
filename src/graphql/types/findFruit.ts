import { mutationField, stringArg, intArg, nonNull, queryField } from 'nexus'

export const findFruit = queryField('findFruit', {
    type: 'Fruit',
    args: {
        name: nonNull(stringArg()),
    },
    resolve: async (_, { name }, ctx) => {
        const fruit = await ctx.fruitStorageService.findFruit(name)
        return {
            id: fruit.id,
            name: fruit.name,
            description: fruit.getDescription(),
            limit: fruit.limit,
            amount: fruit.amount,
        }
    },
})