document.getElementById('year').textContent = new Date().getFullYear();

const grid = document.getElementById('articles');
const emptyMsg = document.getElementById('empty-msg');
const updatedAt = document.getElementById('updated-at');
const filters = document.getElementById('filters');

let articles = [];
let activeCat = 'all';

function formatDate(iso){
  try{
    return new Date(iso).toLocaleString('es-ES', {
      day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit'
    });
  }catch(e){ return iso; }
}

function render(){
  grid.innerHTML = '';
  const list = activeCat === 'all' ? articles : articles.filter(a => a.category === activeCat);
  emptyMsg.hidden = list.length > 0;

  for(const a of list){
    const card = document.createElement('article');
    card.className = 'card';
    const imgBlock = a.imageUrl ? `
      <div class="card-img-wrap">
        <img src="${a.imageUrl}" alt="${escapeHtml(a.title)}" loading="lazy" referrerpolicy="no-referrer" onerror="this.closest('.card-img-wrap').remove()">
        ${a.imageCredit ? `<span class="card-img-credit">${escapeHtml(a.imageCredit)}</span>` : ''}
      </div>` : '';
    card.innerHTML = `
      ${imgBlock}
      <span class="card-cat">${categoryLabel(a.category)}</span>
      <h2>${escapeHtml(a.title)}</h2>
      <p class="summary">${escapeHtml(a.summary)}</p>
      <div class="meta">
        <span>${formatDate(a.publishedAt)}</span>
        <a class="source-link" href="${a.sourceUrl}" target="_blank" rel="noopener noreferrer nofollow">Fuente: ${escapeHtml(a.sourceName)} ↗</a>
      </div>
    `;
    grid.appendChild(card);
  }
}

function categoryLabel(cat){
  const labels = {
    lanzamientos: 'Lanzamientos',
    manufactura: 'Manufactura',
    mercado: 'Mercado y acciones',
    ventas: 'Ventas',
    estadisticas: 'Estadísticas',
    asia: 'Asia'
  };
  return labels[cat] || cat;
}

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str ?? '';
  return div.innerHTML;
}

filters.addEventListener('click', (e) => {
  const btn = e.target.closest('.chip');
  if(!btn) return;
  activeCat = btn.dataset.cat;
  [...filters.children].forEach(c => c.classList.toggle('active', c === btn));
  render();
});

fetch('data/articles.json?t=' + Date.now())
  .then(r => r.json())
  .then(data => {
    articles = (data.articles || []).slice().sort((a,b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    updatedAt.textContent = data.updatedAt ? formatDate(data.updatedAt) : '—';
    render();
  })
  .catch(() => {
    emptyMsg.hidden = false;
    emptyMsg.textContent = 'No se pudieron cargar las noticias.';
  });
