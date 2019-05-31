const express = require('express');
const router = express.Router();
const restController = require('../controllers/restController');

router.get('/tags', function (req, res) {
  restController.getTags()
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

router.get('/quotes', function (req, res) {
  restController.getQuotesList()
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

router.post('/quote', function (req, res) {
  restController.getQuote(req.body.id)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

router.get('/post/:title', function (req, res) {
  restController.getPost(req.params.title)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

router.get('/count', function (req, res) {
  restController.getItemsNumber()
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

router.get('/posts/:type', function (req, res) {
  restController.getPostsList(req.params.type)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

router.get('/posts/:type/tag/:tag', function (req, res) {
  restController.getPostsList(req.params.type, req.params.tag)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

module.exports = router;
