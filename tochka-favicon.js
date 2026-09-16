(() => {
  const href = 'favicon.svg?v=bank-tochka-48';

  function applyFavicon() {
    document.querySelectorAll('link[rel~="icon"]').forEach((link) => {
      if (link.href !== new URL(href, window.location.origin).href) link.href = href;
    });
  }

  applyFavicon();
  new MutationObserver(applyFavicon).observe(document.head, { childList: true });
})();
