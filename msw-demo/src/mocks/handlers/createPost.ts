import { HttpResponse } from 'msw';
import { createPost } from '../data/createPost';

export function createPostHandler() {
  return HttpResponse.json(createPost(), {
    status: 200,
  });
}