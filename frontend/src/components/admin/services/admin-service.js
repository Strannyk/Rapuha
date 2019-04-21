export default {
  authAdmin(instance, login, password) {
    const credentials = {
      login: login,
      password: password
    };

    return instance.$http.post('admin/auth', credentials);
  },

  addTag(instance, tag) {
    return instance.$http.post('admin/tag', { tag: tag });
  }
}
