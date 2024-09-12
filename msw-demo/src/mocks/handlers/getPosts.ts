import { HttpResponse } from 'msw';
import { getPosts } from '../data/getPosts';

const getUserId = (): number | null => {
  return localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null;
}

export function getPostsHandler({ request }) {
  const searchParams = new URLSearchParams(new URL(request.url).search);
  const limit = Number(searchParams.get('limit'));

  return HttpResponse.json(getPosts(limit, getUserId()), {
    status: 200,
  });
}