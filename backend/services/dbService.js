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

  const getDb = () => {
    const dbOptions = getDatabaseOptions();
    return pgp('postgres://' +
      dbOptions.user + ':' +
      dbOptions.password + '@' +
      dbOptions.host + dbOptions.databaseName);
  };

  return {
    getPasswordHash(login) {
      const query = 'SELECT admin_password FROM admins WHERE admin_login = $1';
      return getDb().one(query, login);
    },

    tagExists(tag) {
      const query = 'SELECT EXISTS (SELECT 1 FROM tags WHERE tag_name = $1)';
      return getDb().one(query, tag);
    },

    createTag(tag) {
      const query = 'INSERT INTO tags (tag_name) VALUES ($1)';
      return getDb().none(query, tag);
    },

    getTags() {
      const query = 'SELECT * FROM tags LIMIT 100';
      return getDb().any(query);
    },

    updateTag(tag, newTag) {
      const query = 'UPDATE tags SET tag_name = $2 WHERE tag_name = $1';
      return getDb().none(query, [tag, newTag]);
    }
  };
})();

module.exports = dbService;
