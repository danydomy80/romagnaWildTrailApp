document.addEventListener('DOMContentLoaded', async () => {
  const iscrittiList = document.getElementById('iscrittiList');
  const searchInput = document.getElementById('searchInput');
  const totalCount = document.getElementById('totalCount');
  const adminBadge = document.getElementById('admin-badge');
  const tableHead = document.getElementById('tableHead');

  let allData = [];
  let isAdmin = false;

  // 1. Verifica se l'utente è autenticato come Admin
  const { data: { session } } = await supabaseClient.auth.getSession();
  isAdmin = !!session;

  if (isAdmin) {
    adminBadge.style.display = 'inline-flex';
    // Aggiunge le colonne Admin riservate
    tableHead.innerHTML += `
      <th>Contatti</th>
      <th>Azioni</th>
    `;
  }

  // 2. Caricamento dati dal Database
  async function loadIscritti() {
    let query;

    if (isAdmin) {
      // Se Admin: interroga la tabella completa
      query = supabaseClient
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });
    } else {
      // Se Pubblico: interroga la vista limitata
      query = supabaseClient
        .from('public_iscritti')
        .select('*');
    }

    const { data, error } = await query;

    if (error) {
      console.error('Errore nel caricamento iscritti:', error);
      iscrittiList.innerHTML = `<tr><td colspan="${isAdmin ? 7 : 5}" class="text-center">Errore nel caricamento dei dati.</td></tr>`;
      return;
    }

    allData = data || [];
    renderTable(allData);
  }

  // 3. Rendering della tabella
  function renderTable(data) {
    totalCount.innerText = data.length;

    if (data.length === 0) {
      iscrittiList.innerHTML = `<tr><td colspan="${isAdmin ? 7 : 5}" class="text-center">Nessun iscritto trovato.</td></tr>`;
      return;
    }

    iscrittiList.innerHTML = data.map(item => {
      const fullName = `${item.first_name} ${item.last_name}`;
      const statusClass = item.status || 'in_attesa';

      let rowHtml = `
        <tr>
          <td><strong>${escapeHtml(fullName)}</strong></td>
          <td>${escapeHtml(item.team || 'Singolo')}</td>
          <td><span class="badge-category">${escapeHtml(item.category_event || '')}</span></td>
          <td>${escapeHtml(item.payment_method || '-')}</td>
          <td>
      `;

      // Se Admin: Dropdown per cambiare stato al volo
      if (isAdmin) {
        rowHtml += `
          <select class="select-status-admin" data-id="${item.id}" onchange="updateStatus('${item.id}', this.value)">
            <option value="in_attesa" ${item.status === 'in_attesa' ? 'selected' : ''}>In Attesa</option>
            <option value="confermata" ${item.status === 'confermata' ? 'selected' : ''}>Confermata</option>
            <option value="annullata" ${item.status === 'annullata' ? 'selected' : ''}>Annullata</option>
          </select>
        `;
      } else {
        rowHtml += `<span class="badge-status ${statusClass}">${formatStatus(item.status)}</span>`;
      }

      rowHtml += `</td>`;

      // Colonne riservate Admin
      if (isAdmin) {
        const contactInfo = [item.email, item.phone].filter(Boolean).join('<br>');
        rowHtml += `
          <td><small>${contactInfo || '-'}</small></td>
          <td>
            <button class="btn-delete" onclick="deleteIscrizione('${item.id}', '${escapeHtml(fullName)}')">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        `;
      }

      rowHtml += `</tr>`;
      return rowHtml;
    }).join('');
  }

  // 4. Filtro di ricerca JS in tempo reale
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    const filtered = allData.filter(item => {
      const name = `${item.first_name} ${item.last_name}`.toLowerCase();
      const team = (item.team || '').toLowerCase();
      const cat = (item.category_event || '').toLowerCase();
      return name.includes(term) || team.includes(term) || cat.includes(term);
    });
    renderTable(filtered);
  });

  // Funzioni helper Admin (esposte globalmente per gli eventi inline)
  window.updateStatus = async (id, newStatus) => {
    const { error } = await supabaseClient
      .from('registrations')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      alert('Errore durante l\'aggiornamento dello stato.');
      console.error(error);
    } else {
      loadIscritti();
    }
  };

  window.deleteIscrizione = async (id, name) => {
    if (!confirm(`Sei sicuro di voler eliminare l'iscrizione di ${name}?`)) return;

    const { error } = await supabaseClient
      .from('registrations')
      .delete()
      .eq('id', id);

    if (error) {
      alert('Errore durante l\'eliminazione.');
      console.error(error);
    } else {
      loadIscritti();
    }
  };

  function formatStatus(status) {
    if (status === 'confermata') return 'Confermata';
    if (status === 'annullata') return 'Annullata';
    return 'In Attesa';
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Avvio
  loadIscritti();
});