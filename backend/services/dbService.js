const pgp = require("pg-promise")({
  capSQL: true
});
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

  const addFeedbackQuery = 'INSERT INTO feedback (item_id, creation_date, subject, user_name, body, contacts) VALUES ($1, $2, $3, $4, $5, $6)';

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
      const query = 'INSERT INTO tags VALUES ($1)';
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
      const query = 'SELECT title, to_char(creation_date, \'DD-MM-YYYY\') FROM posts WHERE type = $1 ORDER BY creation_date DESC, title LIMIT 500';
      return getDb().any(query, type);
    },

    addPost(title, data) {
      const postQuery = 'INSERT INTO posts (title, body, type, creation_date) VALUES ($1, $2, $3, $4)';

      return getDb().tx(t => {
        const queries = [];
        const firstQuery = t.none(postQuery, [title, data.body, data.type, data.date]);
        const postsTagColumnSet = new pgp.helpers.ColumnSet([
          'title',
          'tag_name'
        ], { table: 'posts_tags' });
        const postsTagsData = [];

        queries.push(firstQuery);

        for (const tag of data.tags) {
          postsTagsData.push({
            title: title,
            tag_name: tag
          });
        }

        const postsTagInsert = pgp.helpers.insert(postsTagsData, postsTagColumnSet);
        const postTagsQuery = t.none(postsTagInsert);

        queries.push(postTagsQuery);

        return t.batch(queries);
      });
    },

    getPost(title) {
      const query = 'SELECT *, to_char(creation_date, \'DD-MM-YYYY\') from posts WHERE title = $1';
      return getDb().one(query, title);
    },

    deletePost(title) {
      const query = 'DELETE FROM posts WHERE title = $1';
      return getDb().none(query, title);
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

    getQuotesList() {
      const query = 'SELECT *, to_char(creation_date, \'DD-MM-YYYY\') FROM quotes ORDER BY creation_date DESC, body LIMIT 500';
      return getDb().any(query);
    },

    getQuote(id) {
      const query = 'SELECT *, to_char(creation_date, \'DD-MM-YYYY\') FROM quotes WHERE item_id = $1';
      return getDb().one(query, id);
    },

    deleteQuote(id) {
      const query = 'DELETE FROM quotes WHERE item_id = $1';
      return getDb().none(query, id);
    },

    addFeedback(data) {
      return getDb()
        .none(addFeedbackQuery, [data.id, data.creationDate, data.subject, data.userName, data.body, data.contacts]);
    },

    addFeedbackWithUser(data) {
      const userQuery = 'INSERT INTO users VALUES ($1)';

      return getDb().tx(t => t.batch([
        t.none(userQuery, data.userName),
        t.none(addFeedbackQuery, [data.id, data.creationDate, data.subject, data.userName, data.body, data.contacts])
      ]));
    },

    getFeedbackList() {
      const query = 'SELECT *, to_char(creation_date, \'DD-MM-YYYY\') FROM feedback ORDER BY unread DESC, creation_date DESC, user_name, subject LIMIT 500';
      return getDb().any(query);
    },

    getListOfUserFeedback(userName) {
      const query = 'SELECT *, to_char(creation_date, \'DD-MM-YYYY\') FROM feedback WHERE user_name = $1 ORDER BY unread DESC, creation_date DESC, subject LIMIT 500';
      return getDb().any(query, userName);
    },

    getListOfPostFeedback(title) {
      const query = 'SELECT *, to_char(creation_date, \'DD-MM-YYYY\') FROM feedback WHERE subject = $1 ORDER BY unread DESC, creation_date DESC, user_name LIMIT 500';
      return getDb().any(query, title);
    },

    userExists(userName) {
      const query = 'SELECT EXISTS (SELECT 1 FROM users WHERE user_name = $1)';
      return getDb().one(query, userName);
    },

    deleteFeedback(id) {
      const query = 'DELETE FROM feedback WHERE item_id = $1';
      return getDb().none(query, id);
    },

    markFeedbackAsRead(id) {
      const query = 'UPDATE feedback SET unread = FALSE WHERE item_id = $1';
      return getDb().none(query, id);
    },

    clearUserFeedback(userName) {
      const query = 'DELETE FROM users WHERE user_name = $1';
      return getDb().none(query, userName);
    },

    clearFeedback() {
      const query = 'TRUNCATE users CASCADE';
      return getDb().none(query);
    },

    getNumberOfReflections() {
      const query = 'SELECT count(*) FROM posts WHERE type = \'reflection\'';
      return getDb().one(query);
    },

    getNumberOfStories() {
      const query = 'SELECT count(*) FROM posts WHERE type = \'story\'';
      return getDb().one(query);
    },

    getNumberOfQuotes() {
      const query = 'SELECT count(*) FROM quotes';
      return getDb().one(query);
    },

    getPostsList(type) {
      const query = 'SELECT * FROM (SELECT *, to_char(creation_date, \'DD.MM.YYYY\') FROM posts WHERE type = $1) AS p LEFT JOIN posts_tags USING (title) ORDER BY p.creation_date DESC, p.title LIMIT 500';
      return getDb().any(query, type);
    }
  };
})();

module.exports = dbService;
