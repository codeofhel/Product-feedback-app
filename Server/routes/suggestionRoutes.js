const express = require('express');
const router = express.Router();
const { getSuggestion, createSuggestion, getAllSuggestions, updateSuggestion, deleteSuggestion, addComment } = require('../controllers/Suggestionscontroller');
const multer = require('multer');

const upload = multer();
module.exports = router.get("/getsuggestion",getSuggestion);
module.exports = router.get("/getall", getAllSuggestions);
module.exports = router.post('/createsuggestion', upload.none() ,createSuggestion);
module.exports = router.put('/updatesuggestion/:id', upload.none(), updateSuggestion);
module.exports = router.delete('/deletesuggestion/:id', upload.none(), deleteSuggestion);
// module.exports = router.post('/addcomment/:id',addComment)
