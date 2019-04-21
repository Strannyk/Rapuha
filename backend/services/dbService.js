const pgp = require("pg-promise")(/*options*/);
const options = require('../options');

const dbService = (() => {
  const getDatabaseOptions = () => {
    return {
      host: options.database.host,
      databaseName: options.database.databaseName,
      user: options.database.username,
      password: options.database.password
    };
  };

  return {
    getDb() {
      const dbOptions = getDatabaseOptions();
      return pgp('postgres://' +
        dbOptions.user + ':' +
        dbOptions.password + '@' +
        dbOptions.host + dbOptions.databaseName);
    }
  };
})();

module.exports = dbService;
