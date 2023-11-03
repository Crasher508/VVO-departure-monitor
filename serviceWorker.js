const staticDevCrasher508 = "dev-crasher508-unofficial-dvb-dm-v1";
const assets = [
    "index.html",
    "icons/Icon-192.png",
    "icons/Icon-maskable-192.png",
    "icons/Icon-512.png",
    "icons/Icon-maskable-512.png"
];

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
        caches.open(staticDevCrasher508).then(cache => {
            cache.addAll(assets);
        })
    );
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request);
        })
    );
});
