const express = require('express');
const router = express.Router();
const restController = require('../controllers/restController');

router.get('/tags', function (req, res) {
  restController.getTags()
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

module.exports = router;
