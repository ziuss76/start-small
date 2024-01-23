self.addEventListener('push', (e) => {
  const { title, body, icon } = e.data.json();
  e.waitUntil(self.registration.showNotification(title, { body, icon }));
});
