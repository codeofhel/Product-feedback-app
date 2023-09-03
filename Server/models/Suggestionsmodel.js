const mongoose = require("mongoose");

const SuggestionSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    content: String,
    updateState: {
        type: String,
        require: true,
        enum: ['Suggestion', 'Planned', 'In-Progress', 'Live']
    },
    replies: Array,
    // feedbackDetail: {
    //     type: Number,
    //     require: true
    // },
    upvotes: Number

});

module.exports = mongoose.model('Suggestions', SuggestionSchema);