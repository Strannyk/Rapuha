const authService = (() => {
  const tokenStorageKey = 'adminToken';

  return {
    authorizeAdmin(token) {
      localStorage.setItem(tokenStorageKey, token);
    },

    getToken() {
      return localStorage.getItem(tokenStorageKey) || null;
    },

    removeToken() {
      localStorage.removeItem(tokenStorageKey);
    },

    isAdmin() {
      return !!localStorage.getItem(tokenStorageKey);
    }
  };
})();

module.exports = authService;
