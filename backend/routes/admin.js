const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminAuthController');
const jwt = require('../controllers/jwtController').controller;

router.post('/', function (req, res) {
  const token = req.body['token'];
  const result = jwt.verifyToken(token);
  res.send(result);
});

router.post('/auth', function(req, res) {
  adminAuthController.logIn(req.body['login'], req.body['password'])
    .then(result => {
      res.send(result);
    }).catch(err => res.send(err));
});

module.exports = router;
