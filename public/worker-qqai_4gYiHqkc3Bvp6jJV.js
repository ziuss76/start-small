self.addEventListener('push', (t) => {
  const { title: i, body: o, icon: n } = t.data.json();
  t.waitUntil(self.registration.showNotification(i, { body: o, icon: n }));
});
