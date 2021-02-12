// httpRequest => routine-routes => Here

// Using
const User = require('../models/user');

const postUser = async (req, res, next) => {

    const user = req.body;

    const createdUser = new User(
        user
    );

    await createdUser.save();

    res.status(201);
    res.json({message: "User posted"});
};



const getUserByEmail = async (req, res, next) => {
    console.log("Got to getUserByEmail")
    let user = await User.find({email: req.params.email});

    // Turns the response to a regular javascriptObject
    // How does it look if you don't do it?
    res.json(user[0].toObject({getters: true}));
};

exports.getUserByEmail = getUserByEmail;
exports.postUser = postUser;