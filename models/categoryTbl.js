const mongoose = require('mongoose');
const categoryTbl = mongoose.Schema({
    category : {
        type : String,
        required : true
    }
});

const category = mongoose.model('category',categoryTbl);
module.exports = category;