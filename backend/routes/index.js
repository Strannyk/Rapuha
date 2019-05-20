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

router.get('/quote', function (req, res) {
  restController.getQuote(req.body.id)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

router.get('/post/:title', function (req, res) {
  restController.getPost(req.params.title)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

module.exports = router;
