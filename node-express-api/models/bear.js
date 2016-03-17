/**
 * Created by Ron on 2/20/2015.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bearSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Bear', bearSchema);