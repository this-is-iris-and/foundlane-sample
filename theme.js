// Light/dark theme: follows the device setting, unless the visitor picks one.
(function () {
  var root = document.documentElement;
  var KEY = 'foundlane-theme';
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function apply(theme) {
    root.setAttribute('data-theme', theme);
  }
  function current() {
    return saved() || (mq && mq.matches ? 'dark' : 'light');
  }

  // Set the theme before the page paints, to avoid a flash.
  apply(current());

  if (mq && mq.addEventListener) {
    mq.addEventListener('change', function () {
      if (!saved()) apply(current());
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    function label() {
      var dark = root.getAttribute('data-theme') === 'dark';
      var text = dark ? 'Switch to light mode' : 'Switch to dark mode';
      btn.setAttribute('aria-label', text);
      btn.setAttribute('title', text);
    }
    label();
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      label();
    });
  });
})();
