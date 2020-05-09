const express = require('express');
const router = express.Router();
const controller = require('../api/controllers/qmdjMgrController');

router.get('/getJiaZhiSymbols', (req, res, next) => {
    controller.getJiaZhiSymbols(req, res);
})

module.exports = router;