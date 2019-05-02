const commonService = (() => {
  return {
    getTags() {
      return this.$http.get('tags');
    }
  };
})();

module.exports = commonService;
