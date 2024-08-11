import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css';

function isProduction() { // mock для demo, лучше использовать свою функцию
  return false;
}

const prepare = async () => {
  if (!isProduction()) {
    const { worker } = await import('./mocks');
    await worker.start();

    Promise.resolve();
  }

  return Promise.resolve();
};

const app = createApp(App);

prepare().then(() => {
  app.mount('#app')
});
