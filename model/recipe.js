var mongoose = require('mongoose');
// let Timestamp = require('./plugins/timestamp'),
var Schema = mongoose.Schema;

var Ingredient = require('./ingredient');

// create recipe model
var recipeSchema = new Schema({
    sn: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    instructions: String,
    description: String,

    ingredients: [Ingredient],
    servings: {
        amount: Number,
        unit: String},
    image: String,
    date: {
        type: Date,
        default: Date.now
    },
    update: {
        type: Date,
        default: Date.now
    },
    hidden: Boolean,
    meta: {
        votes: {
            type: Number,
            deafault: 0
        },

        favs: {
            type: Number,
            default: 0
        },
        views: {
            type: Number,
            default: 0
        }
    }
    
});
var Recipe = mongoose.model('Recipe',recipeSchema);

exports.recipeDB = {
   createRecipe: function (recipe, callback) {

     var recipeObj = new Recipe(recipe);

     recipeObj.save( function(err, data) {
                 callback(err,data);
                 });
   },

   listRecipes: function (callback) {
      Recipe.find({}, function (err, docs) {
           callback(err,docs);
      });
   },

   getRecipe: function(id, callback) {
      Recipe.findOne({_id: id}, function (err,doc) {
         console.log(err);
         console.log("her er id'et :"+id);
         callback(err, doc);
      });
   },

   deleteRecipe: function(id, callback) {
     Recipe.remove({_id: id}, function(err) {
        console.log(id+ ' blev slettet');
        callback(err);
     });
   },

   updateRecipe: function(id, recipe, callback) {
     Recipe.update({_id: id}, recipe, function(err) {
       callback(err);
     });
   }
};