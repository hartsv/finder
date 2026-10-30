const form = document.getElementById('queryForm');
const success = document.getElementById('success');
const refEl = document.getElementById('ref');
const againBtn = document.getElementById('againBtn');
const message = document.getElementById('message');
const counter = document.getElementById('counter');

/* ---------- Form validation ---------- */
const messages = {
  name: 'Please enter your name.',
  email: 'Please enter a valid email address.',
  phone: 'Use a Kenyan number, e.g. 0712345678.',
  type: 'Please choose what you are sending.',
  topic: 'Please choose a topic.',
  message: 'Please write at least 10 characters.'
};

function showError(field) {
  const box = field.closest('.field');
  const err = box.querySelector('.error');
  const bad = !field.checkValidity();
  field.classList.toggle('invalid', bad);
  err.textContent = bad ? messages[field.name] : '';
  return !bad;
}

form.querySelectorAll('input, select, textarea').forEach(el => {
  el.addEventListener('blur', () => showError(el));
  el.addEventListener('input', () => { if (el.classList.contains('invalid')) showError(el); });
});

message.addEventListener('input', () => {
  counter.textContent = `${message.value.length} / ${message.maxLength}`;
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const fields = [...form.querySelectorAll('input, select, textarea')];
  const results = fields.map(showError);          /* validate every field */
  if (results.includes(false)) {
    fields[results.indexOf(false)].focus();       /* jump to first problem */
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  console.log(data); /* replace with fetch('/your-endpoint', { method: 'POST', body: JSON.stringify(data) }) */

  refEl.textContent = 'FND-' + Date.now().toString().slice(-6);
  form.hidden = true;
  success.hidden = false;
  success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

againBtn.addEventListener('click', () => {
  form.reset();
  counter.textContent = `0 / ${message.maxLength}`;
  form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
  form.querySelectorAll('.error').forEach(el => (el.textContent = ''));
  success.hidden = true;
  form.hidden = false;
});

/* ---------- FAQ ---------- */
const faqItems = [...document.querySelectorAll('#faqList details')];
const noResults = document.getElementById('noResults');

/* Keep only one answer open at a time */
faqItems.forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) faqItems.forEach(other => { if (other !== item) other.open = false; });
  });
});

/* Search filter */
document.getElementById('faqSearch').addEventListener('input', e => {
  const term = e.target.value.trim().toLowerCase();
  let visible = 0;
  faqItems.forEach(item => {
    const match = item.textContent.toLowerCase().includes(term);
    item.hidden = !match;
    if (match) visible++;
  });
  noResults.hidden = visible !== 0;
});
