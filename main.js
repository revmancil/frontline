document.addEventListener('DOMContentLoaded', () => {
  const menuButtons = document.querySelectorAll('.menu-toggle');

  menuButtons.forEach((button) => {
    const navId = button.getAttribute('aria-controls');
    const nav = navId ? document.getElementById(navId) : null;
    if (!nav) return;

    button.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(isOpen));
      button.textContent = isOpen ? 'Close' : 'Menu';
    });
  });

  document.querySelectorAll('[data-current-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const leadForm = document.querySelector('#lead-form');
  if (leadForm) {
    const success = document.querySelector('#lead-form-success');
    leadForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(leadForm);
      const values = Object.fromEntries(data.entries());
      const subject = encodeURIComponent(`Website inquiry from ${values.name || 'Prospective client'}`);
      const bodyLines = [
        `Name: ${values.name || ''}`,
        `Business Name: ${values.business || ''}`,
        `Email: ${values.email || ''}`,
        `Phone: ${values.phone || ''}`,
        `Business Type: ${values.businessType || ''}`,
        `Primary Need: ${values.primaryNeed || ''}`,
        `Current Software: ${values.software || ''}`,
        '',
        'Project Details:',
        values.message || ''
      ];
      const body = encodeURIComponent(bodyLines.join('\n'));
      window.location.href = `mailto:mancil@frontlinebookkeeping.com?subject=${subject}&body=${body}`;
      if (success) {
        success.hidden = false;
        success.textContent = 'Your email draft is ready. If nothing opened, send your note to mancil@frontlinebookkeeping.com.';
      }
    });
  }
});
