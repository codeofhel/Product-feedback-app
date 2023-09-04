
const SuggestionSchema = require("../models/Suggestionsmodel")
const CommentSchema = require("../models/CommentModel")

module.exports.createSuggestion = async (req, res) => {

    const dt = new Date();
    const { title, category, content } = req.body;
    const updateState = 'Suggestion';
    const upvotes = [];
    const replies = [];

    try {
        const response = await SuggestionSchema.create({ title, category, dt, content, updateState, upvotes, replies })

        if (response)
            return res.status(200).json({ message: "Suggestion Created!!", newObj: response });
        else
            return res.status(401).json({ message: "Something got wrong!!" });
    } catch (err) {
        throw new Error(err);
    }
}

module.exports.getAllSuggestions = async (req, res) => {
    const configs = req.query.cat.toLowerCase();
    console.log(configs);
    const configsSet = configs != 'all' ? true : false;
    try {
        const response = await SuggestionSchema.find(configsSet ? { category: configs.toLowerCase() } : {});

        if (response) {
            if (response.length)
                return res.status(200).json({ data: response });
            else
                return res.status(200).json({ data: [], message: "There is no feesback yet." });
        }
    } catch (err) {
        return res.status(401).json({ message: `${err}` });
    }
}

module.exports.getSuggestion = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await SuggestionSchema.findById({ id }, (err, suggestion) => {
            if (err)
                return res.status(401);
            else {
                const commentResponse = CommentSchema.find({ SuggestionId: suggestion.id });
                if (commentResponse)
                    return commentResponse.data;
            }
            console.log(response);
        });
    } catch (err) {

    }
}

module.exports.updateSuggestion = async (req, res) => {
    const { id } = req.params;
    const { title, category, updateState, content, replies } = req.body || JSON.parse(req.body);
    const testbody = req.body;
    console.log(testbody)
    try {
        const response = await SuggestionSchema.updateOne({ _id: id }, { $set: { title: title, category: category, updateState: updateState, content: content, replies: replies } });
        //console.log(response);
        if (response)
            return res.status(200).json({ message: 'Suggestion updated!', objUpdated: { id, title, category, updateState, content, replies } })
        else
            return res.status(401).json({ message: "Something got wrong!!" });
    } catch (err) {
        return res.status(401).json({ message: `${err}` });
    }

}

module.exports.deleteSuggestion = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const response = await SuggestionSchema.deleteOne({ _id: id });

        if (response)
            res.status(200).json({ message: "Suggestion Deleted", objDeleted: id });
        else
            res.send('Something went wrong!')
    } catch (err) {
        res.send(err)
    }

}

// module.exports.addComment = async (req,res) => {
//     const { id } = req.params;
//     const reply = req.body;
//     const objReply = JSON.parse(reply);
//     console.log(objReply)
//     try {
//         const response = await SuggestionSchema.updateOne({ _id: id }, { $set: { replies: objReply } });
//         //console.log(response);
//         if (response)
//             return res.status(200).json({ message: 'Suggestion updated!' })
//         else
//             return res.status(401).json({ message: "Something got wrong!!" });
//     } catch (err) {
//         return res.status(401).json({ message: `${err}` });
//     }
// }