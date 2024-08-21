const VERSION = "v1.3";
const CACHE_NAME = `dev-crasher508-unofficial-vvo-dm-${VERSION}`;
const APP_STATIC_RESOURCES = [
    "index.html",
    "Icon-192x192.png",
    "Icon-512x512.png",
    "favicon-16x16.png",
    "favicon-32x32.png",
    "maskable.svg"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            await cache.addAll(APP_STATIC_RESOURCES);
        })(),
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            const names = await caches.keys();
            await Promise.all(
                names.map((name) => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                }),
            );
            await clients.claim();
        })(),
    );
});


self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then(res => {
            return res || fetch(event.request);
        })
    );
});
