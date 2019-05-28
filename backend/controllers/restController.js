const uuid = require('uuid/v4');
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
              result.push(row.tag_name);
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

    getPostTitles(type) {
      const response = new ResponseMessage();

      return new Promise((resolve, reject) => {
        dbService.getPostTitles(type)
          .then(data => {
            for (const row of data) {
              row.creationDate = row.to_char;
              delete row.to_char;
            }

            response.createDataMessage(data);
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
          .catch(() => {
            response.createErrorMessage(defaultErrorMessage);
            reject(response);
          });
      });
    },

    getPost(title) {
      const response = new ResponseMessage();

      return new Promise((resolve, reject) => {
        Promise.all([
          dbService.getPost(title),
          dbService.getPostsTags(title)
        ])
          .then(data => {
            const post = data[0];
            const tags = data[1];

            post.tags = tags.map(item => item.tag_name);
            post.creationDate = post.to_char;
            delete post.to_char;
            delete post.creation_date;

            response.createDataMessage(post);
            resolve(response);
          })
          .catch(() => {
            response.createErrorMessage(defaultErrorMessage);
            reject(response);
          });
      });
    },

    deletePost(token, title) {
      const response = new ResponseMessage();

      return new Promise((resolve, reject) => {
        if (!tokenIsValid(token)) {
          response.createTokenExpiredMessage();
          reject(response);
          return;
        }

        dbService.deletePost(title)
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

    updatePost(token, title, data) {
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

        data.title = data.title.trim();

        if (title !== data.title) {
          dbService.postExists(data.title)
            .then(res => {
              if (res.exists) {
                const message = 'Пост с названием "' + data.title + '" уже существует';
                response.createErrorMessage(message);
                resolve(response);
              }
              else {
                updatePost();
              }
            })
            .catch(() => {
              response.createErrorMessage(defaultErrorMessage);
              reject(response);
            });
        }
        else {
          updatePost();
        }

        function updatePost() {
          dbService.updatePost(title, data)
            .then(() => {
              response.createSuccessMessage();
              resolve(response);
            })
            .catch(() => {
              response.createErrorMessage(defaultErrorMessage);
              reject(response);
            });
        }
      });
    },

    createQuote(token, data) {
      const response = new ResponseMessage();

      return new Promise((resolve, reject) => {
        if (!tokenIsValid(token)) {
          response.createTokenExpiredMessage();
          reject(response);
          return;
        }

        data.id = uuid();
        data.author = (!data.author || !data.author.trim()) ? null : data.author;

        dbService.addQuote(data)
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

    updateQuote(token, data) {
      const response = new ResponseMessage();

      return new Promise((resolve, reject) => {
        if (!tokenIsValid(token)) {
          response.createTokenExpiredMessage();
          reject(response);
          return;
        }

        data.author = (!data.author || !data.author.trim()) ? null : data.author;

        dbService.updateQuote(data)
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

    getQuotesList() {
      const response = new ResponseMessage();

      return new Promise((resolve, reject) => {
        dbService.getQuotesList()
          .then(data => {
            for (const row of data) {
              row.creationDate = row.to_char;
              row.id = row.item_id;

              delete row.to_char;
              delete row.item_id;
              delete row.creation_date;
            }

            response.createDataMessage(data);
            resolve(response);
          })
          .catch(() => {
            response.createErrorMessage(defaultErrorMessage);
            reject(response);
          });
      });
    },

    getQuote(id) {
      const response = new ResponseMessage();

      return new Promise((resolve, reject) => {
        dbService.getQuote(id)
          .then(data => {
            data.creationDate = data.to_char;
            data.id = data.item_id;

            delete data.to_char;
            delete data.item_id;
            delete data.creation_date;

            response.createDataMessage(data);
            resolve(response);
          })
          .catch(() => {
            response.createErrorMessage(defaultErrorMessage);
            reject(response);
          });
      });
    },

    deleteQuote(token, id) {
      const response = new ResponseMessage();

      return new Promise((resolve, reject) => {
        if (!tokenIsValid(token)) {
          response.createTokenExpiredMessage();
          reject(response);
          return;
        }

        dbService.deleteQuote(id)
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

    getFeedbackList(token) {
      const response = new ResponseMessage();

      return new Promise((resolve, reject) => {
        if (!tokenIsValid(token)) {
          response.createTokenExpiredMessage();
          reject(response);
          return;
        }

        dbService.getFeedbackList()
          .then(data => {
            for (const row of data) {
              row.creationDate = row.to_char;
              row.id = row.item_id;
              row.userName = row.user_name;

              delete row.creation_date;
              delete row.to_char;
              delete row.item_id;
              delete row.user_name;
            }

            response.createDataMessage(data);
            resolve(response);
          })
          .catch(() => {
            response.createErrorMessage(defaultErrorMessage);
            reject(response);
          });
      });
    },

    getListOfUserFeedback(token, userName) {
      const response = new ResponseMessage();

      return new Promise((resolve, reject) => {
        if (!tokenIsValid(token)) {
          response.createTokenExpiredMessage();
          reject(response);
          return;
        }

        dbService.userExists(userName)
          .then(res => {
            if (!res.exists) {
              const message = 'Посетитель "' + userName + '" не найден';
              response.createErrorMessage(message);
              resolve(response);
            }
            else {
              dbService.getListOfUserFeedback(userName)
                .then(data => {
                  for (const row of data) {
                    row.creationDate = row.to_char;
                    row.id = row.item_id;

                    delete row.creation_date;
                    delete row.to_char;
                    delete row.item_id;
                    delete row.user_name;
                  }

                  response.createDataMessage(data);
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

    getListOfPostFeedback(token, title) {
      const response = new ResponseMessage();

      return new Promise((resolve, reject) => {
        if (!tokenIsValid(token)) {
          response.createTokenExpiredMessage();
          reject(response);
          return;
        }

        dbService.postExists(title)
          .then(res => {
            if (!res.exists) {
              const message = 'Пост с названием "' + title + '" не найден';
              response.createErrorMessage(message);
              resolve(response);
            }
            else {
              dbService.getListOfPostFeedback(title)
                .then(data => {
                  for (const row of data) {
                    row.creationDate = row.to_char;
                    row.id = row.item_id;
                    row.userName = row.user_name;

                    delete row.subject;
                    delete row.creation_date;
                    delete row.to_char;
                    delete row.item_id;
                    delete row.user_name;
                  }

                  response.createDataMessage(data);
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

    deleteFeedback(token, id) {
      const response = new ResponseMessage();

      return new Promise((resolve, reject) => {
        if (!tokenIsValid(token)) {
          response.createTokenExpiredMessage();
          reject(response);
          return;
        }

        dbService.deleteFeedback(id)
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

    markFeedbackAsRead(token, id) {
      const response = new ResponseMessage();

      return new Promise((resolve, reject) => {
        if (!tokenIsValid(token)) {
          response.createTokenExpiredMessage();
          reject(response);
          return;
        }

        dbService.markFeedbackAsRead(id)
          .then(() => {
            response.createSuccessMessage();
            resolve(response);
          })
          .catch(err => {
            response.createErrorMessage(defaultErrorMessage);
            reject(response);
          });
      });
    },

    clearUserFeedback(token, userName) {
      const response = new ResponseMessage();

      return new Promise((resolve, reject) => {
        if (!tokenIsValid(token)) {
          response.createTokenExpiredMessage();
          reject(response);
          return;
        }

        dbService.clearUserFeedback(userName)
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

    clearFeedback(token) {
      const response = new ResponseMessage();

      return new Promise((resolve, reject) => {
        if (!tokenIsValid(token)) {
          response.createTokenExpiredMessage();
          reject(response);
          return;
        }

        dbService.clearFeedback()
          .then(() => {
            response.createSuccessMessage();
            resolve(response);
          })
          .catch(() => {
            response.createErrorMessage(defaultErrorMessage);
            reject(response);
          });
      });
    }
  };
})();

module.exports = restController;
