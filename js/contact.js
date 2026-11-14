'use strict';
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');
const phoneField = contactForm.elements.phone;
// Keep typed and pasted phone numbers digits-only, as required by COS 106.
phoneField.addEventListener('input', () => {
  const original = phoneField.value;
  const caret = phoneField.selectionStart ?? original.length;
  const clean = (value) => value.replace(/\D/g, '');
  phoneField.value = clean(original);
  const nextCaret = clean(original.slice(0, caret)).length;
  phoneField.setSelectionRange(nextCaret, nextCaret);
});
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(contactForm));
  const errors = PortfolioCore.validateContact(values);
  for (const key of ['name', 'email', 'phone', 'message']) {
    const field = contactForm.elements[key];
    document.getElementById(`${key}-error`).textContent = errors[key] || '';
    field.setAttribute('aria-invalid', String(Boolean(errors[key])));
  }
  const firstError = Object.keys(errors)[0];
  contactStatus.classList.toggle('success-message', !firstError);
  contactStatus.textContent = firstError
    ? 'Please correct the highlighted fields. Your message has not been sent.'
    : 'Validation successful. This demo has not sent your message.';
  if (firstError) contactForm.elements[firstError].focus();
});
contactForm.addEventListener('input', (event) => {
  contactStatus.textContent = '';
  if (event.target.name) {
    event.target.removeAttribute('aria-invalid');
    const error = document.getElementById(`${event.target.name}-error`);
    if (error) error.textContent = '';
  }
});
