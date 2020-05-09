/*
** Route handler - Root
*/

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('Home Page - Root');
});

module.exports = router;