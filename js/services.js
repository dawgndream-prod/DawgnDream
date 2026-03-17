/**
 * DawgnDream — Services Page Script
 */

document.addEventListener('DOMContentLoaded', () => {
    renderServicesTable();
});

function renderServicesTable() {
    const table = document.getElementById('services-table');
    if (!table) return;

    let html = '';
    // Use the global 'services' from data.js
    if (typeof services !== 'undefined' && Array.isArray(services)) {
        services.forEach(s => {
            html += `
            <div class="price-table-row">
              <div class="service-name">${s.name}</div>
              <div class="price-tag">${s.price}</div>
            </div>
          `;
        });
    } else {
        html = '<p class="text-center text-text-soft">Falha ao carregar os serviços.</p>';
    }
    table.innerHTML = html;
}
