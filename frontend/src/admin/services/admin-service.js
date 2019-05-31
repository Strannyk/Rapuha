const authService = require('../../services/auth-service');

const adminService = {
  authAdmin(login, password) {
    return this.$http.post('admin/auth', {
      login: login,
      password: password
    });
  },

  addTag(tag) {
    return this.$http.put('admin/tag/' + tag, {
      token: authService.getToken()
    });
  },

  updateTag(tag, newTagValue) {
    return this.$http.post('admin/tag/' + tag, {
      tag: newTagValue,
      token: authService.getToken()
    });
  },

  deleteTag(tag) {
    return this.$http.delete('admin/tag/' + tag, {
      body: {
        token: authService.getToken()
      }
    });
  },

  getPostsTitles(type) {
    return this.$http.get('admin/posts/titles/' + type);
  },

  createPost(title, data) {
    return this.$http.put('admin/post/' + title, {
      data: data,
      token: authService.getToken()
    });
  },

  updatePost(title, data) {
    return this.$http.post('admin/post/' + title, {
      data: data,
      token: authService.getToken()
    });
  },

  deletePost(title) {
    return this.$http.delete('admin/post/' + title, {
      body: {
        token: authService.getToken()
      }
    });
  },

  createQuote(data) {
    return this.$http.put('admin/quote', {
      data: data,
      token: authService.getToken()
    });
  },

  updateQuote(data) {
    return this.$http.post('admin/quote', {
      data: data,
      token: authService.getToken()
    });
  },

  deleteQuote(id) {
    return this.$http.delete('admin/quote', {
      body: {
        id: id,
        token: authService.getToken()
      }
    })
  },

  getFeedbackList() {
    return this.$http.post('admin/feedback', {
      token: authService.getToken()
    })
  },

  getListOfUserFeedback(userName) {
    return this.$http.post('admin/feedback/user/' + userName, {
      token: authService.getToken()
    });
  },

  deleteFeedback(id) {
    return this.$http.delete('admin/feedback', {
      body: {
        id: id,
        token: authService.getToken()
      }
    });
  },

  markFeedbackAsRead(id) {
    return this.$http.post('admin/feedback/mark', {
      id: id,
      token: authService.getToken()
    });
  },

  clearFeedback() {
    return this.$http.delete('admin/feedback/all', {
      body: {
        token: authService.getToken()
      }
    });
  },

  clearUserFeedback(username) {
    return this.$http.delete('admin/feedback/all/' + username, {
      body: {
        token: authService.getToken()
      }
    });
  }
};

module.exports = adminService;
