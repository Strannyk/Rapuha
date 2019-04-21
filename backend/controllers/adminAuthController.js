const bcrypt = require('bcrypt');
const jwt = require('./jwtController');
const ResponseMessage = require('../objects/response-message');
const dbService = require('../services/dbService');

const adminAuthController = (() => {
  const databaseName = 'admins';
  const loginField = 'admin_login';
  const passwordField = 'admin_password';
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
      const db = dbService.getDb();
      const query = "SELECT " + passwordField +
        " FROM " + databaseName +
        " WHERE " + loginField +
        " LIKE " + "'" + login + "'";

      return new Promise((resolve, reject) => {
        db.one(query).then(data => {
          bcrypt.compare(password, data[passwordField], (err, res) => {
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
