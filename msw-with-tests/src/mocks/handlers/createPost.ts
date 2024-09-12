import { HttpResponse } from 'msw';
import { createPost } from '../data/createPost';

export async function createPostHandler({ request }) {
  const requestBody = await request.json();

  return HttpResponse.json(createPost(requestBody), {
    status: 200,
  });
}