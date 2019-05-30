const adminService = (() => {
  const getToken = () => localStorage.token || null;

  return {
    authAdmin(login, password) {
      const credentials = {
        login: login,
        password: password
      };

      return this.$http.post('admin/auth', credentials);
    },

    addTag(tag) {
      return this.$http.put('admin/tag/' + tag, {
        token: getToken()
      });
    },

    updateTag(tag, newTagValue) {
      return this.$http.post('admin/tag/' + tag, {
        tag: newTagValue,
        token: getToken()
      });
    },

    deleteTag(tag) {
      return this.$http.delete('admin/tag/' + tag, {
        body: { token: getToken() }
      });
    },

    getPostsTitles(type) {
      return this.$http.get('admin/posts/titles/' + type);
    },

    createPost(title, data) {
      return this.$http.put('admin/post/' + title, {
        data: data,
        token: getToken()
      });
    },

    updatePost(title, data) {
      return this.$http.post('admin/post/' + title, {
        data: data,
        token: getToken()
      });
    },

    deletePost(title) {
      return this.$http.delete('admin/post/' + title, {
        body: { token: getToken() }
      });
    },

    createQuote(data) {
      return this.$http.put('admin/quote', {
        data: data,
        token: getToken()
      });
    },

    updateQuote(data) {
      return this.$http.post('admin/quote', {
        data: data,
        token: getToken()
      });
    },

    deleteQuote(id) {
      return this.$http.delete('admin/quote', {
        body: {
          id: id,
          token: getToken()
        }
      })
    },

    getFeedbackList() {
      return this.$http.post('admin/feedback', {
        token: getToken()
      })
    },

    getListOfUserFeedback(userName) {
      return this.$http.post('admin/feedback/user/' + userName, {
        token: getToken()
      });
    },

    deleteFeedback(id) {
      return this.$http.delete('admin/feedback', {
        body: {
          id: id,
          token: getToken()
        }
      });
    },

    markFeedbackAsRead(id) {
      return this.$http.post('admin/feedback/mark', {
        id: id,
        token: getToken()
      });
    },

    clearFeedback() {
      return this.$http.delete('admin/feedback/all', {
        body: {
          token: getToken()
        }
      });
    },

    clearUserFeedback(username) {
      return this.$http.delete('admin/feedback/all/' + username, {
        body: {
          token: getToken()
        }
      });
    }
  };
})();

module.exports = adminService;
