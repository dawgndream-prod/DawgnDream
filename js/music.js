/**
 * DawgnDream — Music Page Script
 */

document.addEventListener('DOMContentLoaded', () => {
    renderMusicGrid();
    initMusicModal();
});

function renderMusicGrid() {
    const grid = document.getElementById('music-grid');
    if (!grid) return;

    let html = '';
    // Use the global 'releases' from data.js
    if (typeof releases !== 'undefined' && Array.isArray(releases)) {
        releases.forEach((release, index) => {
            html += `
            <div class="group cursor-pointer" onclick="openMusicModal(${index})">
              <div class="aspect-square overflow-hidden rounded-lg mb-4 bg-muted relative">
                <img src="${release.image}" alt="${release.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div class="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300"></div>
              </div>
              <div class="flex justify-between items-start mb-1">
                <h3 class="text-lg font-bold uppercase tracking-wider">${release.title}</h3>
                <span class="text-xs font-mono text-text-dim border border-border px-2 py-0.5 rounded">${release.year}</span>
              </div>
              <p class="text-sm text-text-soft mb-3">${release.type}</p>
              <div class="flex gap-3">
                ${release.platforms.slice(0, 2).map(p => `
                  <span class="text-xs uppercase tracking-widest text-foreground hover:opacity-70 transition-opacity">${p.name}</span>
                `).join('')}
              </div>
            </div>
          `;
        });
    } else {
        html = '<p class="col-span-3 text-center text-text-soft">Falha ao carregar as músicas.</p>';
    }
    grid.innerHTML = html;
}

// Global Audio Controller for Previews
const previewAudio = new Audio();
previewAudio.volume = 0.5;

function playPreview(url) {
    if (!url) return;
    previewAudio.src = url;
    previewAudio.play().catch(e => console.log("Erro ao tocar preview:", e));
}

function stopPreview() {
    previewAudio.pause();
    previewAudio.currentTime = 0;
}

function openMusicModal(index) {
    const modal = document.getElementById('music-modal');
    const modalContent = document.getElementById('modal-content');
    if (!modal || !modalContent) return;

    const release = releases[index];
    if (!release) return;

    modalContent.innerHTML = `
        <div class="aspect-[3/4] overflow-hidden rounded-lg bg-muted">
          <img src="${release.image}" alt="${release.title}" class="w-full h-full object-cover" />
        </div>
        <div class="flex flex-col">
          <div class="mb-6">
            <span class="text-xs font-bold uppercase tracking-[0.2em] text-text-dim mb-2 block">${release.type} — ${release.year}</span>
            <h2 class="text-3xl md:text-5xl font-bold uppercase tracking-widest mb-4">${release.title}</h2>
            <p class="text-text-soft text-lg leading-relaxed">${release.description}</p>
          </div>
          
          <div class="mb-8">
            <h4 class="text-xs font-bold uppercase tracking-widest text-text-dim mb-4 border-b border-white/10 pb-2">Onde Ouvir 🔊</h4>
            <div class="flex flex-wrap gap-4">
              ${release.platforms.map(p => `
                <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="text-xs uppercase tracking-widest hover:text-white/60 transition-colors border border-white/10 px-4 py-2 rounded-full">${p.name}</a>
              `).join('')}
            </div>
          </div>

          ${release.merch && release.merch.length > 0 ? `
            <div>
              <h4 class="text-xs font-bold uppercase tracking-widest text-text-dim mb-4 border-b border-white/10 pb-2">🔥Top 3#🔥</h4>
              <div class="flex flex-col gap-3">
                ${release.merch.map(m => `
                  <div class="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5 group hover:bg-white/10 hover:scale-[1.03] transition-all duration-300 cursor-pointer overflow-hidden"
                       onmouseenter="playPreview('${m.preview}')"
                       onmouseleave="stopPreview()"
                       onclick="window.open('${m.url}', '_blank')">
                    <div class="flex items-center gap-4">
                      <span class="text-xl font-black text-white/20 group-hover:text-white/40 transition-colors">${m.number || ''}</span>
                      <div class="flex flex-col">
                         <span class="text-sm font-bold uppercase tracking-wider text-white/90 group-hover:text-white transition-colors">${m.name}</span>
                         <span class="text-[10px] text-text-dim uppercase tracking-[0.2em] mt-0.5">${m.prod || ''}</span>
                      </div>
                    </div>
                    <div class="flex items-center gap-4">
                       <div class="flex flex-col items-end">
                         <span class="text-[11px] font-mono font-bold text-white/80">${m.views}</span>
                         <span class="text-[9px] text-text-dim uppercase tracking-widest">Views</span>
                       </div>
                       <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 transition-all">
                         <svg class="w-4 h-4 text-white/40 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                         </svg>
                       </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function initMusicModal() {
    const modal = document.getElementById('music-modal');
    const closeBtn = document.getElementById('close-modal');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            stopPreview();
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                stopPreview();
            }
        });
    }
}

// Attach to window for the onclick handler in the grid
window.openMusicModal = openMusicModal;
window.playPreview = playPreview;
window.stopPreview = stopPreview;
