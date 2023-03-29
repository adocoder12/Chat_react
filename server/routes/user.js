const express = require('express')
const {
    loginUser,
    register,
    getAllUsers,
    logOut
} = require("../controllers/userController");


const router = express.Router()
// login route
router.post("/login", loginUser);
// signup route
router.post("/register", register);

//all users
router.get("/allusers/:id", getAllUsers);

router.delete("/logout", logOut);

module.exports = router;