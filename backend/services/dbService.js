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
      const query = 'SELECT * FROM tags ORDER BY tags LIMIT 100';
      return getDb().any(query);
    },

    getPostsTags(postTitle) {
      const query = 'SELECT tag_name FROM posts_tags WHERE title = $1';
      return getDb().any(query, postTitle);
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

    getPostTitles(type) {
      const query = 'SELECT title, to_char(creation_date, \'DD-MM-YYYY\') FROM posts WHERE type = $1 ORDER BY creation_date, title LIMIT 500';
      return getDb().any(query, type);
    },

    addPost(title, data) {
      const postQuery = 'INSERT INTO posts (title, body, type, creation_date) VALUES ($1, $2, $3, $4)';
      const postTagsQuery = 'INSERT INTO posts_tags (title, tag_name) VALUES ($1, $2)';

      return getDb().tx(t => {
        const queries = [];
        const firstQuery = t.none(postQuery, [title, data.body, data.type, data.date]);

        queries.push(firstQuery);

        for (const tag of data.tags) {
          const query = t.none(postTagsQuery, [title, tag]);
          queries.push(query);
        }

        return t.batch(queries);
      });
    },

    getPost(title) {
      const query = 'SELECT *, to_char(creation_date, \'DD-MM-YYYY\') from posts WHERE title = $1';
      return getDb().one(query, title);
    },

    updatePost(title, data) {
      const postQuery = 'UPDATE posts SET (title, body) = ($2, $3) WHERE title = $1';
      const postTagsDeleteQuery = 'DELETE FROM posts_tags WHERE title = $1';
      const postTagsInsertQuery = 'INSERT INTO posts_tags (title, tag_name) VALUES ($1, $2)';

      return getDb().tx(t => {
        const queries = [];
        const firstQuery = t.none(postQuery, [title, data.title, data.body]);
        const secondQuery = t.none(postTagsDeleteQuery, data.title);

        queries.push(firstQuery);
        queries.push(secondQuery);

        for (const tag of data.tags) {
          const query = t.none(postTagsInsertQuery, [data.title, tag]);
          queries.push(query);
        }

        return t.batch(queries);
      });
    },

    addQuote(data) {
      const query = 'INSERT INTO quotes (item_id, author, body, creation_date) VALUES ($1, $2, $3, $4)';
      return getDb().none(query, [data.id, data.author, data.body, data.date]);
    },

    updateQuote(data) {
      const query = 'UPDATE quotes SET (author, body) = ($2, $3) WHERE item_id = $1';
      return getDb().none(query, [data.id, data.author, data.body]);
    },

    getQuotes() {
      const query = 'SELECT *, to_char(creation_date, \'DD-MM-YYYY\') FROM quotes ORDER BY creation_date LIMIT 500';
      return getDb().any(query);
    }
  };
})();

module.exports = dbService;
