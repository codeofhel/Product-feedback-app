const mongoose = require("mongoose");
const suggestion = require('./Suggestionsmodel');

const CommentSchema = new mongoose.Schema({
    SuggestionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: suggestion
    },
    parentId:Number,
    level: Number,
    date: Date,
    content: String
})

module.exports = mongoose.model("Comments", CommentSchema);