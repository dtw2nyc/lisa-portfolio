const filterMap = {
  all: () => true,
  "Consumer Festival": e => e.tags.includes("Consumer Festival") || e.type === "Consumer Festival",
  "Executive Summit": e => e.tags.includes("Executive Summit") || ["Executive Summit","Incentive Trip","Client Dinner","Board Event","Executive Meeting"].includes(e.type),
  "Food Festival": e => e.tags.includes("Food Festival") || e.type === "Food Festival",
  "Pop-up Event": e => e.tags.includes("Pop-up Event") || e.type === "Pop-up Event",
  "Benefit Gala": e => e.tags.includes("Benefit Gala") || e.type === "Benefit Gala",
  "Conference": e => e.tags.includes("Conference") || e.type === "Conference",
  "Community": e => e.tags.some(t => t.includes("Community")) || e.type.includes("Community"),
};

function buildCard(ev) {
  const card = document.createElement('article');
  card.className = 'event-card' + (ev.featured ? ' featured' : '');
  card.dataset.tags = ev.tags.join(',');
  card.dataset.type = ev.type;

  const highlights = ev.highlights.slice(0, 4).map(h => `<li>${h}</li>`).join('');
  const quote = ev.quote ? `<blockquote class="card-quote">${ev.quote}</blockquote>` : '';

  const links = [];
  if (ev.photoLink) links.push(`<a class="card-link" href="${ev.photoLink}" target="_blank" rel="noopener">Photos</a>`);
  if (ev.videoLink) links.push(`<a class="card-link" href="${ev.videoLink}" target="_blank" rel="noopener">Video</a>`);
  if (ev.caseStudyLink) links.push(`<a class="card-link" href="${ev.caseStudyLink}" target="_blank" rel="noopener">Press</a>`);
  const linksHtml = links.length ? `<div class="card-links">${links.join('')}</div>` : '';

  card.innerHTML = `
    <div class="card-header">
      <div>
        <h2 class="card-title">${ev.name}</h2>
        <p class="card-role">${ev.role}</p>
      </div>
      <span class="card-year">${ev.year}</span>
    </div>
    <div class="card-meta">
      <span class="tag">${ev.type}</span>
      <span class="card-client">${ev.client}</span>
      <span class="card-location">📍 ${ev.location}</span>
    </div>
    <div class="card-stats">
      <div class="card-stat">
        <span class="card-stat-val">${ev.attendance}</span>
        <span class="card-stat-key">Attendance</span>
      </div>
      <div class="card-stat">
        <span class="card-stat-val">${ev.budget}</span>
        <span class="card-stat-key">Budget</span>
      </div>
    </div>
    <ul class="card-highlights">${highlights}</ul>
    ${quote}
    ${linksHtml}
  `;
  return card;
}

function render(filter = 'all') {
  const grid = document.getElementById('eventGrid');
  grid.innerHTML = '';
  const fn = filterMap[filter] || filterMap.all;
  events.filter(fn).forEach(ev => grid.appendChild(buildCard(ev)));
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render(btn.dataset.filter);
  });
});

render('all');
