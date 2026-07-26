// Populate the hidden timestamp field with the moment the form loaded.
document.addEventListener('DOMContentLoaded', () => {
  const timestampField = document.getElementById('timestamp');
  if (timestampField) {
    timestampField.value = new Date().toString();
  }

  // Wire up each "See benefits" link to open its matching modal.
  document.querySelectorAll('[data-modal]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const modal = document.getElementById(trigger.dataset.modal);
      if (modal) modal.showModal();
    });
  });

  // Wire up each modal's close button.
  document.querySelectorAll('[data-close]').forEach((closeBtn) => {
    closeBtn.addEventListener('click', () => {
      const modal = document.getElementById(closeBtn.dataset.close);
      if (modal) modal.close();
    });
  });

  // Let a click on the backdrop dismiss the modal too.
  document.querySelectorAll('dialog.tier-modal').forEach((modal) => {
    modal.addEventListener('click', (event) => {
      const rect = modal.getBoundingClientRect();
      const inBounds =
        event.clientX >= rect.left && event.clientX <= rect.right &&
        event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!inBounds) modal.close();
    });
  });
});
