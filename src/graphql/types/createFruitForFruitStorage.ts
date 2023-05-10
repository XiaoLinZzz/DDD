import { mutationField, stringArg, intArg, nonNull } from 'nexus'

export const createFruitForFruitStorage = mutationField('createFruitForFruitStorage', {
    type: 'Fruit',
    args: {
        name: nonNull(stringArg()),
        description: nonNull(stringArg()),
        limit: nonNull(intArg()),
    },
    resolve: async (_, { name, description, limit }, ctx) => {
        const apple =  await ctx.fruitStorageService.createFruit(name, description, limit)
        return {
            id: apple.id,
            name: apple.name,
            description: apple.description.getValue(),
            limit: apple.limit,
            amount: apple.amount,
        }
    },
})
