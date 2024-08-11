import type { IPost } from '@/types/Posts';

export const createPost = (): IPost => ({
  "title": "testTitle",
  "body": "testBody",
  "userId": 1,
  "id": 101
});