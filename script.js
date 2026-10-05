// Solo JS vanilla, nessun server: menu mobile + dropdown touch + voce attiva.
(function () {
  var menuBtn = document.getElementById('menu-btn');
  var navLinks = document.getElementById('nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (a && window.innerWidth < 760) {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Dropdown apribili anche su touch (tap sul bottone).
  Array.prototype.forEach.call(document.querySelectorAll('.dropdown > .dropbtn'), function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var dd = btn.parentElement;
      var wasOpen = dd.classList.contains('open');
      Array.prototype.forEach.call(document.querySelectorAll('.dropdown.open'), function (o) {
        o.classList.remove('open');
      });
      if (!wasOpen) dd.classList.add('open');
    });
  });
  document.addEventListener('click', function () {
    Array.prototype.forEach.call(document.querySelectorAll('.dropdown.open'), function (o) {
      o.classList.remove('open');
    });
  });

  // Evidenzia voce attiva durante lo scroll.
  var links = Array.prototype.slice.call(document.querySelectorAll('#nav-links a[href^="#"]'));
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
