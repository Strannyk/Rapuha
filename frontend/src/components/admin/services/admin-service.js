export default {
  getToken() {
    return localStorage.token || null;
  },

  authAdmin(instance, login, password) {
    const credentials = {
      login: login,
      password: password
    };

    return instance.$http.post('admin/auth', credentials);
  },

  addTag(instance, tag) {
    return instance.$http.post('admin/tag', {
      tag: tag,
      token: this.getToken()
    });
  }
}
