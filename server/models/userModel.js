const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require('validator')



const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    picture: {
        type: String,
    },
    status: {
        type: String,
        default: 'online'
    }

});

// static signup method
UserSchema.statics.signup = async function (username, email, password, picture) {

    // validation
    if (!email || !password || !username) {
        throw Error('All fields must be filled')
    }


    if (!validator.isEmail(email)) {
        throw Error('Email not valid')
    }
    if (password < 4) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ username })

    if (exists) {
        throw Error('User already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, email, password: hash, picture: picture })

    return user
}

// static login method
UserSchema.statics.login = async function (username, password) {

    if (!username || !password) {
        throw Error('All fields must be filled')
    }
    //find user
    const user = await this.findOne({ username })

    if (!user) {
        throw Error('Incorrect username')
    }

    //match password
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password')
    }

    return user
}

module.exports = mongoose.model("Users", UserSchema);
