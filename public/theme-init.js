// Applies the saved (or device) light/dark theme before the page paints,
// so there's no white flash. Kept as a separate file so the site's
// Content-Security-Policy can forbid inline scripts.
try {
  var t = localStorage.getItem('click-smart-theme')
  if (t !== 'dark' && t !== 'light') t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  document.documentElement.dataset.theme = t
} catch (e) {}
