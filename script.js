// Evidenzia voce attiva durante lo scroll. Solo JS vanilla, nessun server.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('nav.topbar a[href^="#"]'));
  var secs = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if (!('IntersectionObserver' in window)) return;
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        links.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  secs.forEach(function (s) { obs.observe(s); });
})();
