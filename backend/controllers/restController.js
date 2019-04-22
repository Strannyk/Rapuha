const dbService = require('../services/dbService');

const restController = (() => {
  return {
    addTag(tag) {
      return new Promise((resolve, reject) => {
        dbService.tagExists(tag)
          .then(res => {
            const tagExists = res.exists;
            resolve(tagExists);
          }).catch(() => reject());
      });
    }
  };
})();

module.exports = restController;
