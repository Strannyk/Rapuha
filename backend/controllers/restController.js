const dbService = require('../services/dbService');
const jwt = require('./jwtController');
const ResponseMessage = require('../objects/responseMessage');

const restController = (() => {
  const tokenIsValid = token => jwt.verifyToken(token);
  const defaultErrorMessage = 'Произошла ошибка';

  return {
    addTag(token, tag) {
      const response = new ResponseMessage();

      return new Promise((resolve, reject) => {
        if (!tag || !tag.trim()) {
          response.createErrorMessage('Пустой тег');
          reject(response);
          return;
        }

        if (!tokenIsValid(token)) {
          response.createTokenExpiredMessage();
          reject(response);
          return;
        }

        dbService.tagExists(tag)
          .then(res => {
            if (res.exists) {
              const message = 'Тег "' + tag + '" уже существует';
              response.createErrorMessage(message);
              resolve(response);
            }
            else {
              dbService.createTag(tag)
                .then(() => {
                  response.createSuccessMessage();
                  resolve(response);
                }).catch(() => {
                response.createErrorMessage(defaultErrorMessage);
                reject(response);
              });
            }
          }).catch(() => {
          response.createErrorMessage(defaultErrorMessage);
          reject(response);
        });
      });
    },

    getTags() {
      const response = new ResponseMessage();

      return new Promise((resolve, reject) => {
        dbService.getTags()
          .then(data => {
            const result = [];

            for (const row of data) {
              const key = Object.keys(row)[0];
              result.push(row[key]);
              result.sort();
            }

            response.createDataMessage(result);
            resolve(response);
          }).catch(() => {
          response.createErrorMessage(defaultErrorMessage);
          reject(response);
        });
      });
    }
  };
})();

module.exports = restController;
