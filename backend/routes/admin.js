const express = require('express');
const router = express.Router();
const adminAuthController = require('../controllers/adminAuthController');

router.post('/', function(req, res) {
  adminAuthController.controller.logIn(req.body['login'], req.body['password'])
    .then(res => {
      console.log(res);
    }).catch(err => console.log(err));
  res.send('respond with a resource');
});

module.exports = router;
