const express = require("express");
const { CreateUser, LoginUser } = require("../controllers/Usercontroller");
const router = express.Router();

module.exports = router.post("/register", CreateUser);
module.exports = router.post("/login",LoginUser)
// module.exports = router.get("/updateUser", UpdateUser);
// module.exports = router.get()