const authService = (() => {
  const tokenStorageKey = 'adminToken';

  return {
    setToken(token) {
      localStorage.setItem(tokenStorageKey, token);
    },

    getToken() {
      return localStorage.getItem(tokenStorageKey) || null;
    },

    logOutAdmin() {
      localStorage.removeItem(tokenStorageKey);
    },

    isAdmin() {
      return !!localStorage.getItem(tokenStorageKey);
    }
  };
})();

module.exports = authService;
