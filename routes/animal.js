var express = require('express');

var router = express.Router();

const Animal_controlers = require('../controllers/Animal');


/* GET home page. */
router.get('/',Animal_controlers.Animal_view_all_Page);



module.exports = router;