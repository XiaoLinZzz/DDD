import { mutationField, stringArg, intArg, nonNull, queryField } from 'nexus'

export const findFruit = queryField('findFruit', {
    type: 'Fruit',
    args: {
        name: nonNull(stringArg()),
    },
    resolve: async (_, { name }, ctx) => {
        const fruit = await ctx.fruitStorageService.findFruit(name)

        if (!fruit) {
            throw new Error('Fruit not found')
        }

        return {
            id: fruit.id,
            name: fruit.name,
            description: fruit.getDescription(),
            limit: fruit.limit,
            amount: fruit.amount,
        }
    },
})