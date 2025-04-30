const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const navigationSchema = new Schema({

    routeNo: {
        type: String,
        required : false
        
    },

    navigationText: {
        type: String,
        required : false
        
    }
})

const navigation = mongoose.model("navigation", navigationSchema);

module.exports = navigation;