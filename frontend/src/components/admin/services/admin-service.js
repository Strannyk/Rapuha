const adminService = {
  getToken() {
    return localStorage.token || null;
  },

  authAdmin(login, password) {
    const credentials = {
      login: login,
      password: password
    };

    return this.$http.post('admin/auth', credentials);
  },

  addTag(tag) {
    return this.$http.post('admin/tag', {
      tag: tag,
      token: adminService.getToken()
    });
  }
};

module.exports = adminService;
