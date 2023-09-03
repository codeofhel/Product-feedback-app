const UserSchema = require("../models/Usermodel")
const bcrypt = require("bcrypt");

module.exports.CreateUser = async (req, res) => {
    const { name, email, gender, age, username, password } = req.body;
    const salt = bcrypt.genSalt(10);
    const encryptedPassword = bcrypt.hash(password, salt);
    try {
        const response = await UserSchema.create({ name, email, gender: gender || null, age: age || null, admin: false, username, encryptedPassword });
        if (response.ok)
            return res.status(200).json({ message: "User created successfully!!" })
    } catch (error) {
        return res.status(401).json({ message: `${error}` })
    }
}

module.exports.LoginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        
        const user = await UserSchema.find({ username });
        if (user) {
            const result = await bcrypt.compare(password, user.password)
            if (result.ok) {
                req.session.user = { name: user.name, username: user.username }
                return res.status(200).json({ user: { name: user.name, email: user.email, age: user.age, gender: user.gender }, message: "User Logado" })
            } else {
                return res.status(401).json({ message: "Password errada!!" })
            }
        } else {
            return res.status(401).json({ message: "User não existe!" })
        }
        
    } catch (error) {
        return res.send(`Error ${error} in the server!!`)
    }
}