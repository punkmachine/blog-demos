import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { setupServer } from 'msw/node';

import { handlers } from './mocks/handlers';
import App from './App.vue';

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

beforeEach(() => {
  server.resetHandlers();
});

describe('App', () => {
  it('должен загрузить посты при монтировании', async () => {
    const wrapper = mount(App);

    await flushPromises();

    expect(wrapper.vm.data.length).toBe(15);
    expect(wrapper.vm.data[0].title).toBeTruthy();
  });

  it('должен создать новый пост', async () => {
    const wrapper = mount(App);
    const postData = {
      title: 'New Test Post',
      description: 'This is a test post body.'
    }

    await flushPromises();

    const titleInput = wrapper.find('input');
    const bodyTextarea = wrapper.find('textarea');
    await titleInput.setValue(postData.title);
    await bodyTextarea.setValue(postData.description);

    await wrapper.find('form').trigger('submit.prevent');

    await flushPromises();

    expect(wrapper.vm.data[0].title).toBe(postData.title);
    expect(wrapper.vm.data[0].body).toBe(postData.description);
  });
});
