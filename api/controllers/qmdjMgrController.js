const model = require('../models/qmdj');

const controller = {};

controller.getJiaZhiSymbols = (req, res) => {

    model.getJiaZhiSymbols(req.body)
    .then((result) => {
        res.json(result);
    })
}




module.exports = controller;