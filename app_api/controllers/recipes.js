var mongoose = require('mongoose');
var Rec = mongoose.model('Recipe');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};


