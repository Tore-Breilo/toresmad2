var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
// create recipe model
var ingredientSchema = new Schema({
    amount: {
        type: Number,
        min: 0,
        max: 500
    },
    unit: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        required: true,
        trim: true
    }
});
var Ingredient = mongoose.model('Ingredient',ingredientSchema);