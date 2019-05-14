const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminAuthController');
const restController = require('../controllers/restController');

router.post('/auth', function (req, res) {
  adminAuthController.logIn(req.body.login, req.body.password)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

router.put('/tag/:tag', function (req, res) {
  restController.createTag(req.body.token, req.params.tag)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

router.post('/tag/:tag', function (req, res) {
  restController.updateTag(req.body.token, req.params.tag, req.body.tag)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

router.delete('/tag/:tag', function (req, res) {
  restController.deleteTag(req.body.token, req.params.tag)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

router.put('/post/:post', function (req, res) {
  restController.createPost(req.body.token, req.params.post, req.body.data)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

router.put('/quote', function (req, res) {
  restController.createQuote(req.body.token, req.body.data)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

module.exports = router;
