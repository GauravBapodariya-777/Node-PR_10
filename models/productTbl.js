const mongoose = require('mongoose');
const productTbl = mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },
    subcategoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'subcategory'
    },
    product : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        default : 1
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    image : {
        type : String,
        required : true
    }
});

const product = mongoose.model('product',productTbl);
module.exports = product;