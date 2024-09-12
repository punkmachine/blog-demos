import { http } from 'msw';
import { urls } from '@/mocks/settings';

import { createPostHandler } from './createPost';
import { getPostsHandler } from './getPosts';

export const handlers = [
  http.get(urls.getPosts, getPostsHandler),
  http.post(urls.createPost, createPostHandler),
];