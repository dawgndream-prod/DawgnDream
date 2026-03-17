/**
 * DawgnDream — Tour Page Script
 */

document.addEventListener('DOMContentLoaded', () => {
    renderTourList();
    initTourModal();
});

function renderTourList() {
    const list = document.getElementById('tour-list');
    if (!list) return;

    let html = '';
    // Use the global 'tourDates' from data.js
    if (typeof tourDates !== 'undefined' && Array.isArray(tourDates)) {
        tourDates.forEach((t, index) => {
            let statusBadge = '';
            let btnClass = '';
            let btnText = 'Tickets';

            const status = t.status ? t.status.toLowerCase() : 'available';

            if (status === 'sold-out' || status === 'soldout') {
                statusBadge = '<span class="text-[10px] uppercase tracking-widest px-2 py-1 rounded status-soldout">Sold Out</span>';
                btnClass = 'opacity-50 cursor-not-allowed border-border text-text-dim hover:bg-transparent hover:text-text-dim';
                btnText = 'Sold Out';
            } else if (status === 'presale') {
                statusBadge = '<span class="text-[10px] uppercase tracking-widest px-2 py-1 rounded status-presale">Presale</span>';
            } else if (status === 'available') {
                statusBadge = '<span class="text-[10px] uppercase tracking-widest px-2 py-1 rounded status-available">Available</span>';
            } else if (status === 'preview') {
                statusBadge = '<span class="text-[10px] uppercase tracking-widest px-2 py-1 rounded status-preview">Preview</span>';
            }

            html += `
            <div class="group glass-card p-6 flex flex-col md:flex-row gap-6 md:items-center justify-between transition-all duration-300 hover:bg-white/5">
              <div class="flex items-center gap-6 md:w-1/4 shrink-0">
                <div class="flex flex-col items-center justify-center text-center">
                  <span class="text-sm font-semibold text-text-soft uppercase tracking-wider">${t.month}</span>
                  <span class="text-4xl font-light tracking-tighter">${t.day}</span>
                </div>
                <div class="hidden md:block w-px h-12 bg-border"></div>
              </div>
              
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-1">
                  <h3 class="text-xl font-bold uppercase tracking-wide">${t.city}</h3>
                  ${statusBadge}
                </div>
                <p class="text-text-soft">${t.venue} — ${t.name}</p>
              </div>
              
              <div class="md:w-1/4 shrink-0 flex md:justify-end">
                <button onclick="openTourModal(${index})" class="w-full md:w-auto px-6 py-3 border border-border rounded-full text-xs font-semibold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors text-center ${btnClass}">
                  ${btnText}
                </button>
              </div>
            </div>
          `;
        });
    } else {
        html = '<p class="text-center text-text-soft">Falha ao carregar as datas da turnê.</p>';
    }
    list.innerHTML = html;
}

function openTourModal(index) {
    const modal = document.getElementById('tour-modal');
    const modalContent = document.getElementById('tour-modal-content');
    if (!modal || !modalContent) return;

    const tour = tourDates[index];
    if (!tour) return;

    modalContent.innerHTML = `
        <div class="mb-8">
          <span class="text-xs font-bold uppercase tracking-[0.2em] text-text-dim mb-2 block">${tour.month} ${tour.day}, ${tour.year}</span>
          <h2 class="text-3xl md:text-5xl font-bold uppercase tracking-widest mb-4">${tour.city}</h2>
          <p class="text-text-soft text-lg leading-relaxed mb-6">${tour.name} @ ${tour.venue}</p>
          <p class="text-text-dim leading-relaxed mb-8 whitespace-pre-line">${tour.description || ''}</p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 class="text-xs font-bold uppercase tracking-widest text-text-dim mb-4 border-b border-white/10 pb-2">Informações do Local 📍</h4>
              <p class="text-white font-medium mb-2">${tour.venue}</p>
              <a href="${tour.venueAddressUrl || '#'}" target="_blank" rel="noopener noreferrer" class="text-sm text-red-500 hover:text-red-400 transition-colors underline">Ver no Google Maps</a>
              <div class="mt-4 space-y-1">
                <p class="text-xs text-text-soft">Abertura: ${tour.doors}</p>
                <p class="text-xs text-text-soft">Show: ${tour.show}</p>
              </div>
            </div>
            <div>
              <h4 class="text-xs font-bold uppercase tracking-widest text-text-dim mb-4 border-b border-white/10 pb-2">Valores do Ingresso 🎫</h4>
              <div class="space-y-2">
                ${tour.tickets && tour.tickets.length > 0 ? tour.tickets.map(ticket => `
                  <div class="flex justify-between items-center bg-white/5 p-3 rounded-lg border border-white/5">
                    <span class="text-xs uppercase tracking-wider text-white/90">${ticket.type}</span>
                    <span class="text-xs font-mono font-bold text-red-500">${ticket.price}</span>
                  </div>
                `).join('') : '<p class="text-xs text-text-soft">Informações de valores em breve.</p>'}
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4">
            <a href="${tour.url || '#'}" target="_blank" rel="noopener noreferrer" class="flex-1 bg-white text-black text-center py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors">
              Comprar Online
            </a>
            <a href="${tour.contactUrl || '#'}" target="_blank" rel="noopener noreferrer" class="flex-1 border border-white/20 text-white text-center py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
              Contato Vendedor
            </a>
          </div>
        </div>
      `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function initTourModal() {
    const modal = document.getElementById('tour-modal');
    const closeBtn = document.getElementById('close-tour-modal');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Attach to window for the onclick handler in the list
window.openTourModal = openTourModal;
