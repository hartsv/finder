const form = document.getElementById('landlordForm');
const pages = [...form.querySelectorAll('.form-page')];
const dots = [...document.querySelectorAll('.progress li')];
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const amenityDetails = document.getElementById('amenityDetails');
const amenitySummary = document.getElementById('amenitySummary');
const amenityDropdown = document.getElementById('amenityDropdown');

let current = 0;

/* A page is complete when every enabled field in it is valid */
function pageIsValid(i) {
  return [...pages[i].querySelectorAll('input, select, textarea')]
    .every(el => el.disabled || el.checkValidity());
}

function render() {
  pages.forEach((p, i) => { p.hidden = i !== current; });
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === current);
    d.classList.toggle('done', i < current);
  });

  const last = current === pages.length - 1;
  prevBtn.hidden = current === 0;
  nextBtn.hidden = last;
  submitBtn.hidden = !last;
  updateButtons();
}

/* Next / Submit stay disabled until the current page is filled in */
function updateButtons() {
  const ok = pageIsValid(current);
  nextBtn.disabled = !ok;
  submitBtn.disabled = !ok;
}

nextBtn.addEventListener('click', () => {
  if (pageIsValid(current) && current < pages.length - 1) {
    current++;
    render();
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

prevBtn.addEventListener('click', () => {
  if (current > 0) {
    current--;
    render();
  }
});

/* Re-check whenever anything changes; mark fields as touched for error styling */
form.addEventListener('input', e => { e.target.classList.add('touched'); updateButtons(); });
form.addEventListener('change', updateButtons);
form.addEventListener('focusout', e => e.target.classList.add('touched'));

/* ---------- Amenities dropdown ---------- */
function slug(text) { return text.toLowerCase().replace(/[^a-z0-9]+/g, '-'); }

function addAmenityRow(name) {
  const id = slug(name);
  const row = document.createElement('div');
  row.className = 'amenity-row';
  row.dataset.amenity = name;
  row.innerHTML = `
    <h3>${name}</h3>
    <div class="choices" role="radiogroup" aria-label="Is ${name} part of the rent?">
      <label><input type="radio" name="${id}-included" value="Included in rent" required> Part of the rent</label>
      <label><input type="radio" name="${id}-included" value="Charged separately" required> Not part of the rent</label>
    </div>
    <div class="charge field" hidden>
      <label for="${id}-charge">How do you charge for ${name}?</label>
      <input type="text" id="${id}-charge" name="${id}-charge"
             placeholder="e.g. KES 1,500 per month, or pay per unit used">
    </div>`;

  const charge = row.querySelector('.charge');
  const chargeInput = charge.querySelector('input');
  row.querySelectorAll('input[type="radio"]').forEach(r => {
    r.addEventListener('change', () => {
      const separate = row.querySelector('input[type="radio"]:checked').value === 'Charged separately';
      charge.hidden = !separate;
      chargeInput.required = separate;
      chargeInput.disabled = !separate;
      if (!separate) chargeInput.value = '';
      updateButtons();
    });
  });
  chargeInput.disabled = true; /* hidden until "Not part of the rent" is chosen */
  amenityDetails.appendChild(row);
}

document.querySelectorAll('input[name="amenity"]').forEach(box => {
  box.addEventListener('change', () => {
    if (box.checked) {
      addAmenityRow(box.value);
    } else {
      amenityDetails.querySelector(`[data-amenity="${box.value}"]`)?.remove();
    }
    const chosen = [...document.querySelectorAll('input[name="amenity"]:checked')].map(b => b.value);
    amenitySummary.textContent = chosen.length ? chosen.join(', ') : 'Select amenities';
    updateButtons();
  });
});

/* Close the dropdown when clicking elsewhere */
document.addEventListener('click', e => {
  if (!amenityDropdown.contains(e.target)) amenityDropdown.open = false;
});

/* ---------- Submit ---------- */
form.addEventListener('submit', e => {
  e.preventDefault();
  /* Safety check: every page must be valid */
  const firstBad = pages.findIndex((_, i) => !pageIsValid(i));
  if (firstBad !== -1) { current = firstBad; render(); return; }

  const data = new FormData(form);
  console.log(Object.fromEntries(data)); /* replace with fetch('/your-endpoint', { method: 'POST', body: data }) */

  form.hidden = true;
  document.querySelector('.progress').hidden = true;
  document.getElementById('success').hidden = false;
});

render();
