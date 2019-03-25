const pgp = require("pg-promise")(/*options*/);
const bcrypt = require('bcrypt');
const options = require('../options');

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
            resolve(result);
          });
        }).catch(err => reject(err));
      });
    }
  };
})();

const service = {
  getDatabaseOptions() {
    return {
      host: options.storageConfig.database.host,
      databaseName: options.storageConfig.database.databaseName,
      user: options.storageConfig.database.username,
      password: options.storageConfig.database.password
    };
  },

  generateToken() {

  }
};

exports.controller = adminAuthController;
