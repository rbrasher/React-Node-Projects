var mongoose = require('mongoose');

//define our database Schema
var PostSchema = new mongoose.Schema({
    title: String,
    body: String,
    upvotes: {type: Number, default: 0},
    downvotes: {type: Number, default: 0},
    date: {type: Date, default: null}
});

PostSchema.methods.upvote = function(cb) {
    this.upvotes += 1;
    this.save(cb);
};

PostSchema.methods.downvote = function(cb) {
    this.downvotes += 1;
    this.save(cb);
};

//register our Post model with global mongoose object
mongoose.model('Post', PostSchema);