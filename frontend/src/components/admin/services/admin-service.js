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
    return this.$http.put('admin/tag/' + tag, {
      token: adminService.getToken()
    });
  },

  updateTag(tag, newTagValue) {
    return this.$http.post('admin/tag/' + tag, {
      tag: newTagValue,
      token: adminService.getToken()
    });
  },

  deleteTag(tag) {
    return this.$http.delete('admin/tag/' + tag, {
      body: { token: adminService.getToken() }
    });
  },

  createPost(data) {

  }
};

module.exports = adminService;
