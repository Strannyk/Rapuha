const dbService = require('../services/dbService');
const jwt = require('./jwtController');
const ResponseMessage = require('../objects/responseMessage');

const restController = (() => {
  const tokenIsValid = token => jwt.verifyToken(token);
  const defaultErrorMessage = 'Произошла ошибка';

  return {
    createTag(token, tag) {
      const response = new ResponseMessage();

      return new Promise((resolve, reject) => {
        if (!tokenIsValid(token)) {
          response.createTokenExpiredMessage();
          reject(response);
          return;
        }

        if (!tag || !tag.trim()) {
          response.createErrorMessage('Пустой тег');
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
              dbService.addTag(tag)
                .then(() => {
                  response.createSuccessMessage();
                  resolve(response);
                })
                .catch(() => {
                  response.createErrorMessage(defaultErrorMessage);
                  reject(response);
                });
            }
          })
          .catch(() => {
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
          })
          .catch(() => {
            response.createErrorMessage(defaultErrorMessage);
            reject(response);
          });
      });
    },

    updateTag(token, tag, newTag) {
      const response = new ResponseMessage();

      return new Promise((resolve, reject) => {
        if (!tokenIsValid(token)) {
          response.createTokenExpiredMessage();
          reject(response);
          return;
        }

        dbService.updateTag(tag, newTag)
          .then(() => {
            response.createSuccessMessage();
            resolve(response);
          })
          .catch(() => {
            response.createErrorMessage(defaultErrorMessage);
            reject(response);
          });
      });
    },

    deleteTag(token, tag) {
      const response = new ResponseMessage();

      return new Promise((resolve, reject) => {
        if (!tokenIsValid(token)) {
          response.createTokenExpiredMessage();
          reject(response);
          return;
        }

        dbService.deleteTag(tag)
          .then(() => {
            response.createSuccessMessage();
            resolve(response);
          })
          .catch(() => {
            response.createErrorMessage(defaultErrorMessage);
            reject(response);
          });
      });
    },

    createPost(token, title, data) {
      const response = new ResponseMessage();

      return new Promise((resolve, reject) => {
        if (!tokenIsValid(token)) {
          response.createTokenExpiredMessage();
          reject(response);
          return;
        }

        if (!Array.isArray(data.tags) || !data.tags.length) {
          response.createErrorMessage(defaultErrorMessage);
          reject(response);
          return;
        }

        title = title.trim();
        dbService.postExists(title)
          .then(res => {
            if (res.exists) {
              const message = 'Пост с названием "' + title + '" уже существует';
              response.createErrorMessage(message);
              resolve(response);
            }
            else {
              dbService.addPost(title, data)
                .then(() => {
                  response.createSuccessMessage();
                  resolve(response);
                })
                .catch(() => {
                  response.createErrorMessage(defaultErrorMessage);
                  reject(response);
                });
            }
          })
          .catch(err => {
            console.log(err);
            response.createErrorMessage(defaultErrorMessage);
            reject(response);
          });
      });
    }
  };
})();

module.exports = restController;
