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
  }
};

module.exports = dataService;
