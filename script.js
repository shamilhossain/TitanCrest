document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeToggle = document.querySelector('.theme-toggle');
  const siteHeader = document.querySelector('.site-header');

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
    });
  }

  const updateHeaderState = () => {
    if (!siteHeader) {
      return;
    }

    siteHeader.classList.toggle('is-scrolled', window.scrollY > 50);
  };

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
});

// Appended from claude_code.html: catalog interactions
function toggleAcc(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle('open');
}
