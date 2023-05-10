// types/FruitType.ts
import { objectType } from '@nexus/schema';

export const FruitType = objectType({
  name: 'Fruit',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('description');
    t.int('limit');
    t.int('amount');
  },
});
