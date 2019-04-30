const bcrypt = require('bcrypt');
const jwt = require('./jwtController');
const dbService = require('../services/dbService');
const ResponseMessage = require('../objects/responseMessage');

const adminAuthController = (() => {
  const authService = {
    getSuccessResponse() {
      const token = jwt.signToken();
      const response = new ResponseMessage();
      response.createAccessTokenMessage(token);

      return response;
    },

    getErrorResponse() {
      const error = new ResponseMessage();
      error.createErrorMessage('Ошибка авторизации');

      return error;
    }
  };

  return {
    logIn(login, password) {
      return new Promise((resolve, reject) => {
        dbService.getPasswordHash(login)
          .then(data => {
            bcrypt.compare(password, data.admin_password, (err, res) => {
              const result = err || res;
              const response = result ? authService.getSuccessResponse() : authService.getErrorResponse();
              resolve(response);
            });
          }).catch(() => {
          reject(authService.getErrorResponse());
        });
      });
    }
  };
})();

module.exports = adminAuthController;
