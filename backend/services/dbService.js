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

    addTag(tag) {
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
    },

    deleteTag(tag) {
      const query = 'DELETE FROM tags WHERE tag_name = $1';
      return getDb().none(query, tag);
    },

    postExists(title) {
      const query = 'SELECT EXISTS (SELECT 1 FROM posts WHERE title = $1)';
      return getDb().one(query, title);
    },

    addPost(data) {
      const postTagsQuery = 'INSERT INTO posts_tags (title, tag_name) VALUES ($1, $2)';
      const postQuery = 'INSERT INTO posts (title, body, type, creation_date) VALUES ($1, $2, $3, $4)';

      return getDb().tx(t => {
        const queries = [];

        for (const tag of data.tags) {
          const query = t.none(postTagsQuery, [data.title, tag]);
          queries.push(query);
        }

        queries.push(postQuery, [data.title, data.body, data.type, data.date]);

        return t.batch(queries);
      });
    }
  };
})();

module.exports = dbService;
