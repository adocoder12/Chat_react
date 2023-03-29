const User = require("../models/userModel");
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;


const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}
// login a user
module.exports.loginUser = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const user = await User.login(username, password)
        user.status = "online"
        await user.save();
        // create a token
        const token = createToken(user._id)
        const _id = user._id
        const status = user.status
        const picture = user.picture

        res.status(200).json({ username, email, _id, status, picture, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// signup a user
module.exports.register = async (req, res) => {
    const { username, email, password, picture } = req.body
    try {
        const user = await User.signup(username, email, password, picture)


        // create a token
        const token = createToken(user._id)

        res.status(200).json({ username, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "_id",
            "email",
            "username",
            "picture",
            "status"
        ]);
        return res.json(users);
    } catch (ex) {
        next(ex);
    }
};

module.exports.logOut = async (req, res) => {

    try {
        const { _id } = req.body;
        const user = await User.findById(_id);
        user.status = "online";
        await user.save();
        res.status(200).send();
    } catch (e) {
        console.log(e);
        res.status(400).send()
    }
}