import type { IPost } from '@/types/Posts';

interface IRequestBody {
  title: string,
  body: string,
  userId: number,
};

export const createPost = (body: IRequestBody): IPost => ({
  "title": body.title,
  "body": body.body,
  "userId": body.userId,
  "id": 101
});