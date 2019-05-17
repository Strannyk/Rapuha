const commonService = {
  getTags() {
    return this.$http.get('tags');
  },

  getQuotes() {
    return this.$http.get('quotes');
  },

  getPost(title) {
    return this.$http.get('post/' + title);
  }
};

module.exports = commonService;
