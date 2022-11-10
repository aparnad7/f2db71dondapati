const mongoose = require("mongoose") 
const animalSchema = mongoose.Schema({ 
    animal_color : String,
    animal_Type : String,
    animal_age : Number
}) 

module.exports = mongoose.model("Animal", animalSchema) 