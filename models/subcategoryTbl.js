const mongoose = require('mongoose');
const subcategoryTbl = mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },
    subcategory : {
        type : String,
        required : true
    }
});

const subcategory = mongoose.model('subcategory',subcategoryTbl);
module.exports = subcategory;