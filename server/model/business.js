let mongoose = require('mongoose');
let bookModel = mongoose.Schema({
    name: String,
    number: Number,
    email: String,
  

},

{
    collection:"businesslist"
});

module.exports = mongoose.model('businessList',bookModel);