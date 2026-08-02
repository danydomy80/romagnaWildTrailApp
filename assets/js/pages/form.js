document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrationForm');
  const feedbackMsg = document.getElementById('feedbackMessage');
  const btnSubmit = document.getElementById('btnSubmit');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    
    // Nascondi e svuolta eventuali messaggi precedenti
    feedbackMsg.style.display = 'none';
    feedbackMsg.className = 'form-feedback';
    feedbackMsg.innerText = '';

    // --- 1. VALIDAZIONE DATA DI NASCITA ---
    const rawBirthDate = document.getElementById('birth_date').value;
    const birthDate = new Date(rawBirthDate);
    const birthYear = birthDate.getFullYear();
    const today = new Date();

    // Controlla se la data è valida, compresa dal 1930 ad oggi
    if (!rawBirthDate || isNaN(birthDate.getTime()) || birthYear < 1930 || birthDate > today) {
      feedbackMsg.innerText = '❌ Inserisci una data di nascita valida';
      feedbackMsg.className = 'form-feedback error';
      feedbackMsg.style.display = 'block';
      feedbackMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return; // Interrompe l'invio
    }

    // --- 2. VALIDAZIONE TELEFONO ---
    const rawPhone = document.getElementById('phone').value.trim();
    // Pulisce la stringa mantenendo solo le cifre numeriche
    const cleanPhone = rawPhone.replace(/\D/g, ''); 

    if (cleanPhone.length < 9) {
      feedbackMsg.innerText = '❌ Inserisci un numero di telefono valido (almeno 9 cifre numeriche).';
      feedbackMsg.className = 'form-feedback error';
      feedbackMsg.style.display = 'block';
      feedbackMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return; // Interrompe l'invio
    }
    
    // --- 3. PREPARAZIONE E INVIO DATI ---
    btnSubmit.disabled = true;
    btnSubmit.innerText = 'Invio in corso...';
    
    // Raccogli i dati dal Form
    const formData = new FormData(form);
    const data = {
      first_name: formData.get('first_name').trim(),
      last_name: formData.get('last_name').trim(),
      birth_date: formData.get('birth_date'),
      phone: formData.get('phone').trim(),
      email: formData.get('email').trim() || null,
      team: formData.get('team').trim() || 'Singolo',
      category_event: formData.get('category_event'),
      payment_method: formData.get('payment_method'),
      notes: formData.get('notes').trim() || null,
      status: 'in_attesa'
    };

    try {
      // Invio a Supabase
      const { data: responseData, error } = await supabaseClient
        .from('registrations')
        .insert([data]);

      if (error) {
        throw error;
      }

      // Gestione SUCCESSO
      feedbackMsg.innerText = '🎉 Iscrizione avvenuta con successo! Ti aspettiamo a Talamello.';
      feedbackMsg.className = 'form-feedback success';
      feedbackMsg.style.display = 'block';

      form.reset();

      // Scroll dolcemente verso il messaggio per farlo notare all'utente
      feedbackMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });

    } catch (err) {
      // Gestione ERRORE
      console.error('Errore durante l\'iscrizione:', err);

      feedbackMsg.innerText = '❌ Si è verificato un errore durante l\'invio. Riprova o contattaci su WhatsApp.';
      feedbackMsg.className = 'form-feedback error';
      feedbackMsg.style.display = 'block';

      feedbackMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } finally {
      // Ripristina bottone
      btnSubmit.disabled = false;
      btnSubmit.innerText = 'Conferma Iscrizione';
    }
  });
});