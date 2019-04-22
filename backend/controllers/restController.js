const dbService = require('../services/dbService');
const jwt = require('./jwtController');

const restController = (() => {
  const tokenIsValid = token => jwt.verifyToken(token);

  return {
    addTag(token, tag) {
      return new Promise((resolve, reject) => {
        if (!tag.trim()) {
          reject('empty tag'); // message
          return;
        }

        if (!tokenIsValid(token)) {
          reject('token expired'); // message
          return;
        }

        dbService.tagExists(tag)
          .then(res => {
            if (res.exists) {
              resolve('tag already exists'); // message
            }
            else {
              dbService.createTag(tag)
                .then(() => resolve('success')) // message
                .catch(() => reject('sql error')); // message
            }
          }).catch(() => reject('error')); // message
      });
    }
  };
})();

module.exports = restController;
