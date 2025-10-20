const CACHE_VERSIONS = {
  fonts: 'fonts-cache-v1',
  // Здесь можно добавить другие типы кэшей
};

// Ресурсы для предкэширования
const PRECACHE_ASSETS = {
  fonts: [
    '/fonts/Inter-Regular.woff2',
    '/fonts/Inter-Medium.woff2',
    '/fonts/Inter-SemiBold.woff2',
    '/fonts/Inter-Bold.woff2',
  ],
  // Здесь можно добавить другие ресурсы для предкэширования:
};

// ============================================
// УСТАНОВКА (Install) - предкэширование
// ============================================
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_VERSIONS.fonts).then(cache => {
        return cache.addAll(PRECACHE_ASSETS.fonts);
      }),
    ]),
  );

  self.skipWaiting();
});

// ============================================
// АКТИВАЦИЯ (Activate) - очистка старых кэшей
// ============================================
self.addEventListener('activate', event => {
  const currentCaches = Object.values(CACHE_VERSIONS);

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => !currentCaches.includes(cacheName)).map(cacheName => caches.delete(cacheName)),
      );
    }),
  );

  return self.clients.claim();
});

// ============================================
// FETCH - стратегии кэширования
// ============================================
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Стратегия: Cache First для шрифтов
  if (url.pathname.startsWith('/fonts/') && url.pathname.endsWith('.woff2')) {
    event.respondWith(handleFontsRequest(request));
    return;
  }

  // Здесь можно добавить другие стратегии кэширования:
  // - Network First для API запросов
  // - Cache First для изображений
  // - Stale-While-Revalidate для других ресурсов
});

// ============================================
// СТРАТЕГИИ КЭШИРОВАНИЯ
// ============================================

/**
 * Cache First - сначала проверяем кэш, затем сеть
 * Используется для шрифтов: если шрифт уже в кэше - отдаём его,
 * если нет - загружаем из сети и сохраняем в кэш
 */
async function handleFontsRequest(request) {
  const cache = await caches.open(CACHE_VERSIONS.fonts);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) return cachedResponse;

  try {
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    throw error;
  }
}
