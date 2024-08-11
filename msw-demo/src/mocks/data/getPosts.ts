import { faker } from '@faker-js/faker';
import type { IPost } from '@/types/Posts';

export const getPosts = (limit: number = 15): IPost[] => {
  const mockData = [];

  for (let i = 1; i <= limit; i++) {
    mockData.push({
      userId: faker.number.int({ min: 1, max: 100 }),
      id: i,
      title: faker.lorem.words(),
      body: faker.lorem.paragraph(),
    });
  }

  return mockData;
};