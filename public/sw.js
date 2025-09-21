// Enhanced Service Worker with advanced caching strategies
const CACHE_NAME = 'jdilig-portfolio-v2.1.0';
const OFFLINE_CACHE = 'jdilig-offline-v1.0.0';
const STATIC_CACHE = 'jdilig-static-v2.1.0';
const DYNAMIC_CACHE = 'jdilig-dynamic-v2.1.0';

// URLs to cache during install
const CORE_CACHE_URLS = [
  '/',
  '/about',
  '/projects',
  '/code',
  '/offline.html',
  '/_next/static/css/',
  '/_next/static/chunks/'
];

// Install event - precache core resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing v2.1.0...');
  
  event.waitUntil(
    Promise.all([
      // Clear old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheName.includes('v2.1.0') && !cacheName.includes('v1.0.0')) {
              console.log('Service Worker: Clearing old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Precache core resources
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('Service Worker: Precaching core resources');
        return cache.addAll(['/offline.html']).catch(error => {
          console.log('Service Worker: Some resources failed to cache:', error);
        });
      })
    ])
  );
  
  // Take control immediately
  self.skipWaiting();
});

// Activate event - claim clients and cleanup
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating v2.1.0...');
  
  event.waitUntil(
    Promise.all([
      clients.claim(),
      // Cleanup old caches more aggressively
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheName.includes('v2.1.0') && !cacheName.includes('v1.0.0')) {
              console.log('Service Worker: Removing outdated cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

// Advanced fetch handling with multiple strategies
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Only handle same-origin requests and GET requests
  if (url.origin !== location.origin || event.request.method !== 'GET') {
    return;
  }

  // Handle different resource types with appropriate strategies
  if (event.request.destination === 'document') {
    // HTML pages: Network-first with offline fallback
    event.respondWith(handleDocumentRequest(event.request));
  } else if (url.pathname.includes('/_next/static/')) {
    // Next.js static assets: Cache-first (immutable)
    event.respondWith(handleStaticAssets(event.request));
  } else if (url.pathname.includes('/images/') || event.request.destination === 'image') {
    // Images: Cache-first with network fallback
    event.respondWith(handleImageRequest(event.request));
  } else if (url.pathname.includes('.json')) {
    // JSON data: Network-first with cache fallback
    event.respondWith(handleAPIRequest(event.request));
  } else {
    // Other resources: Stale-while-revalidate
    event.respondWith(handleGenericRequest(event.request));
  }
});

// Network-first strategy for HTML documents
async function handleDocumentRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network failed for document, checking cache');
    
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If no cache and it's a navigation request, serve offline page
    if (request.mode === 'navigate') {
      console.log('Service Worker: Serving offline page');
      return caches.match('/offline.html');
    }
    
    // Last resort: return a basic offline response
    return new Response(
      '<h1>Offline</h1><p>Please check your internet connection.</p>',
      { 
        headers: { 'Content-Type': 'text/html' },
        status: 503,
        statusText: 'Service Unavailable'
      }
    );
  }
}

// Cache-first strategy for static assets (immutable)
async function handleStaticAssets(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Failed to fetch static asset', request.url);
    throw error;
  }
}

// Cache-first strategy for images
async function handleImageRequest(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Return a placeholder image for failed image requests
    console.log('Service Worker: Image request failed', request.url);
    return new Response(
      '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="#f3f4f6"/><text x="200" y="150" text-anchor="middle" fill="#6b7280" font-family="Arial" font-size="14">Image unavailable offline</text></svg>',
      { headers: { 'Content-Type': 'image/svg+xml' } }
    );
  }
}

// Network-first strategy for API/JSON requests
async function handleAPIRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: API request failed, checking cache', request.url);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return empty array for failed JSON requests
    return new Response('[]', {
      headers: { 'Content-Type': 'application/json' },
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Stale-while-revalidate strategy for generic requests
async function handleGenericRequest(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  // Always fetch from network to update cache in background
  const networkResponsePromise = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => {
    console.log('Service Worker: Network request failed for', request.url);
  });
  
  // Return cached response immediately if available, otherwise wait for network
  return cachedResponse || networkResponsePromise;
}

// Handle cache cleanup - run periodically
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEANUP_CACHE') {
    event.waitUntil(cleanupOldCaches());
  }
});

async function cleanupOldCaches() {
  const cacheNames = await caches.keys();
  const oldCaches = cacheNames.filter(cacheName => 
    !cacheName.includes('v2.1.0') && !cacheName.includes('v1.0.0')
  );
  
  await Promise.all(oldCaches.map(cacheName => caches.delete(cacheName)));
  console.log('Service Worker: Cleaned up', oldCaches.length, 'old caches');
}