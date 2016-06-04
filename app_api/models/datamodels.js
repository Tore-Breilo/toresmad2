var mongoose = require('mongoose');
// create recipeSchema ver 1
var recipeSchema = new mongoose.Schema({
    'title': String,
    'instructions': String,
    'ingredients': [String]
});


// create recipe model ver  2

// create ingredient model ver 1
var ingredientSchema = new mongoose.Schema({
    amount: { type: Number, min: 0, max: 500 },
    unit: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true }
});

var recipeSchema = new mongooseSchema({
    id: { type: String, require: true, trim: true, unique: true },
    title: { type: String, required: true, trim: true },
    instructions: [String],
    description: String,
    ingredients: [Ingredient],
    servings: { amount: String, unit: String },
    image: String, 
    created: { type: Date, default: Date.now},
    revised: { type: Date, default: Date.now},
    tip: {type: String },
    author: { type: String },
    hidden: Boolean,
    meta: { 
        votes: { type: Number, deafault: 0 },
        favs: { type: Number, default: 0 },
        views: { type: Number, default: 0 }
    }
});

// var Recipe = mongoose.model('Recipe',recipeSchema);

var recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    address: String,
    rating: {
        type: Number,
        "default": 0,
        min: 0,
        max: 5
    },
    facilities: [String],
    // Always store coordinates longitude, latitude order.
    coords: {
        type: [Number],
        index: '2dsphere'
    },
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});

// create recipe model ver  3
var recipeSchema = new mongooseSchema({
    id: {
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
    instructions: [String],
    description: String,

    ingredients: [Ingredient],
    servings: {
        amount: String,
        unit: String
    },
    image: String,
    created: {
        type: Date,
        default: Date.now
    },
    revised: {
        type: Date,
        default: Date.now
    },
    tip: {
        type: String
    },
    author: {
        type: String
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
// var Recipe = mongoose.model('Recipe',recipeSchema);

var recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    address: String,
    rating: {
        type: Number,
        "default": 0,
        min: 0,
        max: 5
    },
    facilities: [String],
    // Always store coordinates longitude, latitude order.
    coords: {
        type: [Number],
        index: '2dsphere'
    },
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});
mongoose.model('Recipe', recipeSchema);
