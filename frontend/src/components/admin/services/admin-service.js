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

  getPostsTitles(type) {
    return this.$http.get('admin/posts/titles/' + type);
  },

  createPost(title, data) {
    return this.$http.put('admin/post/' + title, {
      data: data,
      token: adminService.getToken()
    });
  },

  createQuote(data) {
    return this.$http.put('admin/quote', {
      data: data,
      token: adminService.getToken()
    });
  }
};

module.exports = adminService;
