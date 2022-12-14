var Animal = require('../models/Animal');

// List of all Animals 
exports.Animal_list = async function (req, res) {
    try {
        theAnimals = await Animal.find();
        res.send(theAnimals);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


exports.Animal_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await Animal.findById(req.query.id)
        res.render('animaldetail',
            { title: 'Animal Detail', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};


exports.Animal_create_Page = function (req, res) {
    console.log("create view")
    try {
        res.render('animalcreate', { title: 'Animal Create' });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};


// for a specific Animal. 
exports.Animal_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await Animal.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};

// Handle Animal create on POST. 
exports.Animal_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Animal create POST');
};

// Handle Animal delete form on DELETE. 
exports.Animal_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await Animal.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};

exports.Animal_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id)
    try {
        let result = await Animal.findById(req.query.id)
        res.render('animalupdate', { title: 'Animal Update', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle Animal update form on PUT. 
exports.Animal_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Animal.findById(req.params.id)
        // Do updates of properties

        if (req.body.animal_color) toUpdate.animal_color = req.body.animal_color;
        if (req.body.animal_Type) toUpdate.animal_Type = req.body.animal_Type;
        if (req.body.animal_age) toUpdate.animal_age = req.body.animal_age;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id}
    failed`);
    }
};
// VIEWS 
// Handle a show all view 
exports.Animal_view_all_Page = async function (req, res) {
    try {
        theAnimals = await Animal.find();
        res.render('Animal', { title: 'Animal Search Results', Ani_results: theAnimals });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

exports.Animal_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Animal();
    // We are looking for a body, since POST does not have query parameters. 
    // Even though bodies can be in many different formats, we will be picky 
    // and require that it be a json object 
    // {
    //     animal_color : "black",
    //     animal_Type : "dog",
    //     animal_age : 7
    //   }
    document.animal_color = req.body.animal_color;
    document.animal_Type = req.body.animal_Type;
    document.animal_age = req.body.animal_age;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
}; 

// Handle a delete one view with id from query
exports.Animal_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await Animal.findById(req.query.id)
    res.render('Animaldelete', { title: 'Animal Delete', toShow:
   result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };