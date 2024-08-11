import { HttpResponse } from 'msw';
import { getPosts } from '../data/getPosts';

export function getPostsHandler({ params, request }) {
  console.log('params >>>', params);
  console.log('request >>>', request);

  return HttpResponse.json(getPosts(), {
    status: 200,
  });
}