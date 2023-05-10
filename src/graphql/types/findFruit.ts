import { mutationField, stringArg, intArg, nonNull, queryField } from 'nexus'

export const findFruit = queryField('findFruit', {
    type: 'Fruit',
    args: {
        name: nonNull(stringArg()),
    },
    resolve: async (_, { name }, ctx) => {
        return await ctx.fruitStorageService.findFruit(name)
    },
})