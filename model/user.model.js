const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    templateJSON: {
        type: JSON
    },
    date: {
        type: String
    },
    shop: {
        type: String
    }
});

module.exports = mongoose.model('user', userSchema);