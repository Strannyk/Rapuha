const pgp = require("pg-promise")(/*options*/);
const bcrypt = require('bcrypt');
const options = require('../options');
const jwt = require('./jwtController');
const ResponseMessage = require('../objects/response-message');

const adminAuthController = (() => {
  const databaseName = 'admins';
  const loginField = 'admin_login';
  const passwordField = 'admin_password';

  return {
    logIn(login, password) {
      const dbOptions = service.getDatabaseOptions();
      const db = pgp('postgres://' +
        dbOptions.user + ':' +
        dbOptions.password + '@'
        + dbOptions.host + dbOptions.databaseName);
      const query = "SELECT " + passwordField +
        " FROM " + databaseName +
        " WHERE " + loginField +
        " LIKE " + "'" + login + "'";

      return new Promise((resolve, reject) => {
        db.one(query).then(data => {
          bcrypt.compare(password, data[passwordField], (err, res) => {
            const result = err || res;
            const response = result ? service.getSuccessResponse() : service.getErrorResponse();
            resolve(response);
          });
        }).catch(() => {
          reject(service.getErrorResponse());
        });
      });
    }
  };
})();

const service = {
  getDatabaseOptions() {
    return {
      host: options.database.host,
      databaseName: options.database.databaseName,
      user: options.database.username,
      password: options.database.password
    };
  },

  getSuccessResponse() {
    const token = jwt.signToken();
    const response = new ResponseMessage();
    response.addToken(token);

    return response;
  },

  getErrorResponse() {
    const error = new ResponseMessage();
    error.createErrorMessage('Ошибка авторизации');

    return error;
  }
};

module.exports = adminAuthController;
