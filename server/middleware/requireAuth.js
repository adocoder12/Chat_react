const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

module.exports.verifyToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({ error: 'authorization requiered' });
    }
    const token = authorization.split('')[1];
    try {
        const { _id } = jwt.verify(token, process.env.SECRET);
        req.user = await User.findOne({ _id }).select('_id');
        next();
    } catch (error) {
        return res.status(401).send({ error: 'Request no authorized' });
    }
}