import { HttpResponse } from 'msw';
import { getPosts } from '../data/getPosts';

export function getPostsHandler({ request }) {
  const searchParams = new URLSearchParams(new URL(request.url).search);
  const limit = Number(searchParams.get('limit'));

  return HttpResponse.json(getPosts(limit), {
    status: 200,
  });
}