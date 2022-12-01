var express = require('express'); 
var router = express.Router(); 

// Require controller modules. 
var api_controller = require('../controllers/api'); 
var Animal_controller = require('../controllers/Animal'); 

const secured = (req, res, next) => { 
    if (req.user){ 
      return next(); 
    } 
    req.session.returnTo = req.originalUrl; 
    res.redirect("/login"); 
  } 

/// API ROUTE /// 

// GET resources base. 
router.get('/', api_controller.api); 

/// Animal ROUTES /// 

// POST request for creating a Animal.  
router.post('/Animal', Animal_controller.Animal_create_post); 

// DELETE request to delete Animal. 
router.delete('/Animal/:id', Animal_controller.Animal_delete); 

// PUT request to update Animal. 
router.put('/Animal/:id', Animal_controller.Animal_update_put); 

// GET request for one Animal. 
router.get('/Animal/:id', Animal_controller.Animal_detail); 

// GET request for list of all Animal items. 
router.get('/Animal', Animal_controller.Animal_list); 

router.get('/detail',secured, Animal_controller.Animal_view_one_Page);

router.get('/create',secured,Animal_controller.Animal_create_Page);

router.get('/update',secured, Animal_controller.Animal_update_Page);

router.get('/delete',secured, Animal_controller.Animal_delete_Page);

module.exports = router; 
