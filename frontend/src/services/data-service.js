const dataService = {
  getTags() {
    return this.$http.get('tags');
  },

  getQuotesList() {
    return this.$http.get('quotes');
  },

  getQuote(id) {
    return this.$http.post('quote', { id: id });
  },

  getPost(title) {
    return this.$http.get('post/' + title);
  },

  getItemsNumber() {
    return this.$http.get('count');
  },

  getPostsList(type) {
    return this.$http.get('posts/' + type);
  },

  getPostsByTag(type, tag) {
    return this.$http.get('posts/' + type + '/tag/' + tag);
  },

  createFeedback(data) {
    return this.$http.put('feedback', { data: data });
  }
};

module.exports = dataService;
