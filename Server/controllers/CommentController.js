const CommentSchema = require('../models/CommentModel');

module.exports.CreateComment = async (req, res) => {
    const { } = req.body;
}

module.exports.UpdateComment = async (req, res) => {
    const { id } = req.params.id;
    const { content } = req.body;

    try {
        const response = await CommentSchema.findByIdAndUpdate({ id }, { content: content });
        if (response.ok)
            return res.json({ message: 'Comment updated', data: response.data });
    } catch (err) {
        return res.send('Problema de servidor')
    }
}

module.exports.DeleteComment = async (req, res) => {
    const { id } = req.params.id;
    try {

        const response = CommentSchema.deleteOne({ id });
        if (response.ok)
            return res.send("Comment deleted!");
        else
            return res.send('Something went wrong!');

    } catch (err) {
        return res.send(`${err}`);
    }
}