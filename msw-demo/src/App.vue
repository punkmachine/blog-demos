<script setup>
import { ref, onMounted } from 'vue';

const data = ref([]);
const newPostTitle = ref('');
const newPostBody = ref('');
const isAddingPost = ref(false);
const errors = ref({
  title: '',
  body: '',
});

onMounted(() => {
  fetch('https://jsonplaceholder.typicode.com/posts?test=test')
    .then(response => response.json())
    .then(json => {
      data.value = json;
    });
});

const validateForm = () => {
  errors.value.title = newPostTitle.value ? '' : 'Title is required';
  errors.value.body = newPostBody.value ? '' : 'Body is required';
  return !errors.value.title && !errors.value.body;
};

const addPost = () => {
  if (!validateForm()) {
    return;
  }

  isAddingPost.value = true;

  const newPost = {
    title: newPostTitle.value,
    body: newPostBody.value,
    userId: 1,
  };

  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  })
    .then(response => response.json())
    .then(post => {
      data.value.unshift(post);
      newPostTitle.value = '';
      newPostBody.value = '';
      isAddingPost.value = false;
    });
};
</script>

<template>
  <main class="flex h-screen">
    <section class="w-2/3 p-6 overflow-y-auto">
      <h1 class="text-3xl font-bold mb-6">Posts</h1>
      <ul>
        <li v-for="post in data" :key="post.id" class="mb-4 p-4 border border-gray-300 rounded-md">
          <h2 class="text-xl font-semibold">{{ post.title }}</h2>
          <p class="text-gray-700">{{ post.body }}</p>
        </li>
      </ul>
    </section>

    <aside class="w-1/3 p-6 bg-gray-100 fixed right-0 top-0 h-full">
      <h2 class="text-2xl font-bold mb-4">Add New Post</h2>
      <form @submit.prevent="addPost" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Title</label>
          <input
            v-model="newPostTitle"
            :class="{'border-red-500': errors.title}"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
          />
          <p v-if="errors.title" class="text-red-500 text-sm">{{ errors.title }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Body</label>
          <textarea
            v-model="newPostBody"
            :class="{'border-red-500': errors.body}"
            class="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            rows="4"
          ></textarea>
          <p v-if="errors.body" class="text-red-500 text-sm">{{ errors.body }}</p>
        </div>

        <button
          type="submit"
          class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          :disabled="isAddingPost"
        >
          {{ isAddingPost ? 'Adding...' : 'Add Post' }}
        </button>
      </form>
    </aside>
  </main>
</template>
