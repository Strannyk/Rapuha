const commonService = {
  getTags() {
    return this.$http.get('tags');
  },

  getQuotes() {
    return this.$http.get('quotes');
  }
};

module.exports = commonService;
