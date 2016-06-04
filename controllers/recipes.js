var recipeDB = require('../model/recipe.js').recipeDB;

// index listing of recipes at /recipes/
exports.index = function(req, res) {
	recipeDB.listRecipes(function(err, docs) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('recipes/index', {
                title: 'Tores Mad',
               	recipes: docs
            });
        }
    });
};

// display new recipe form
exports.new = function(req, res) {
    //var filePath = require('path').normalize(__dirname + "/../public/recipes/new.html");
    //res.sendFile(filePath);
    res.render('recipes/newrecipe', {
        title: 'Tilføj en ny opskrift',
        //recipes: docs
    });
};

// add a recipe
exports.create = function(req, res) {
    console.log('Opskriften der er indtastet hedder: ' + req.body.recipetitle);
    if (req.body.amount) {
        console.log('Amount type : ' + typeof req.body.amount);
        console.log('Amount : ' + req.body.amount);
    }

    var ingr = [];

    if (req.body.amount) {
        if (typeof req.body.amount === 'object') {
            for (var i = 0; i < req.body.amount.length; i++) {
                ingr.push({
                    'amount': req.body.amount[i],
                    'unit': req.body.unit[i],
                    'type': req.body.type[i]
                });
                //ingr.push({req.body.amount[i], req.body.unit[i],  req.body.type[i]});

            }
        } else {
            ingr.push({
                'amount': req.body.amount,
                'unit': req.body.unit,
                'type': req.body.type
            });
        }

    } else {
        ingr.push({
            'amount': 0,
            'unit': '',
            'type': ''
        });
    }
    console.log(ingr);

    var recipe = {
        sn: req.body.recipesn,
        title: req.body.recipetitle,
        instructions: req.body.recipeinstructions,
        image: req.body.recipeimage,
        ingredients: ingr,
        //price : parseFloat(req.body.recipeprice),
        description: req.body.recipedescription

    };
    console.log('Opskriften der er indtastet hedder: ' + recipe.title);

    recipeDB.createRecipe(recipe, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            console.log(data);
            res.render('recipes/added', {
                recipe: recipe
            });
        }
    });
};


// show a recipe
exports.show = function(req, res) {
    var id = req.params.id;
    console.log('Opskrift der skal vises har id: '+id);

    recipeDB.getRecipe(id, function(err, doc) {
        if (err)
            res.send('Der mangler desværre en opskrift med nummeret ' + id);
        else
        	//console.log('længden på doc er:'+doc.length);
            console.log("typen af instruktioner er: "+ typeof(doc.instructions));
            console.log(doc);
            res.render('recipes/show', {
                title: 'Vis opskrift',
                recipe: doc
            });
    });
};

// delete a recipe
exports.destroy = function(req, res) {
    var id = req.params.id;
    recipeDB.deleteRecipe(id, function(err) {
        if (err) {
            res.send('Der mangler desværre en opskrift med nummeret ' + id);
        } else {
            console.log('slettede ' + id);
            res.render('recipes/deleted', {
                title: 'Opskriften blev slettet'
                
            });
            
        }
    });

};


// display edit form
exports.edit = function(req, res) {
    console.log(req.params);
    var id = req.params.id;
    console.log(id);
    recipeDB.getRecipe(id, function(err, doc) {
        console.log(doc);
        if (err)
            res.send('Der mangler desværre en opskrift med nummeret ' + id);
        else
            var recipe={
                recipetitle:doc.title
            };
            res.render('recipes/edit', {
                title: 'Rediger opskrift',
                recipe: doc
            });
    });
};

// update a recipe
exports.update = function(req, res) {
    var id = req.params.id;

    var recipe = {
    	_id: id,
        sn: req.body.recipesn,
        title: req.body.recipetitle,
        instructions: req.body.recipeinstructions,
        ingredients: req.body.recipeingredients,
        image: req.body.recipeimage,
        //price : parseFloat(req.body.recipeprice),
        description: req.body.recipedesc,

    };

    console.log(id);
    console.log(recipe);
    recipeDB.updateRecipe(sn, recipe, function(err) {
        if (err)
            res.send('Der var et opdateringsproblem,' + err);
        else
            res.render('recipes/added', {
                title: 'Opskriften blev opdateret',
                recipe: recipe
            });
    });
};