const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemCode: {
        type: String,
        required : false
        
    },
    itemName : {
        type : String,
        required : false
    },
    itemBrand : {
        type : String,
        required : false
    },
    itemCategory : {
        type : String,
        required : false,
        // enum: ['Present', 'Absent', 'Late', 'Half-day']
    },
    itemPrice : {
        type : Number,
        required : false
    },
    itemQuantity : {
        type : Number,
        required : false
    },
    expireDate : {
        type : String,
        required : false
    }
})

const item = mongoose.model("item", itemSchema);

module.exports = item;