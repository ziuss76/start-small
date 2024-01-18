self.addEventListener('push', (e) => {
  const { title, body } = e.data.json();
  e.waitUntil(self.registration.showNotification(title, { body }));
});
