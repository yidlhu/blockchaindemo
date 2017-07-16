var express = require('express');
var router = express.Router();
var ctrler = require('../controllers/controller.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.render('blockchain');
});

router.get('/about', function(req, res) {
    res.send('About birds');
});

router.route('/api/order/newinfo')
    .post(ctrler.newOrderInfo);

router.route('/api/sensor/newinfo')
    .post(ctrler.newSensorInfo);

router.route('/api/order')
    .get(ctrler.getOrder);

router.route('/api/sensor/list')
    .get(ctrler.listIOTInfo);

router.route('/api/sensor/ResetIOTTable')
    .get(ctrler.resetIOTTable)

module.exports = router;
