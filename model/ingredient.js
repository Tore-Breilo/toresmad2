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
        type: String
    }
});
//exports.User = mongoose.model('User', userSchema);
//exports.Ingredient = mongoose.model('ngredient',ingredientSchema);
var Ingredient = mongoose.model('Ingredient',ingredientSchema);