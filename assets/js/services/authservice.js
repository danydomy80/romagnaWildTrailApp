// Service di autenticazione Supabase Admin
const authService = {
  // Login con email e password
  async login(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  // Logout dell'utente corrente
  async logout() {
    const { error } = await supabaseClient.auth.signOut();
    if (error) console.error('Errore durante il logout:', error);
    window.location.href = 'admin-login.html';
  },

  // Controlla se esiste una sessione attiva
  async getSession() {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    if (error) {
      console.error('Errore nel recupero della sessione:', error);
      return null;
    }
    return session;
  },

  // Reindirizza se NON si è autenticati (da usare nelle pagine protette)
  async requireAuth() {
    const session = await this.getSession();
    if (!session) {
      window.location.href = 'admin-login.html';
    }
    return session;
  }
};