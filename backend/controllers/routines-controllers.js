// httpRequest => routine-routes => Here

// Using
const Routine = require('../models/routines');

const postRoutines = async (req, res, next) => {
    // What exactly is this?
    const routines = req.body;

    // This tells the data base which structure the data has. 
    // Defined in models/routines.js
    const createdRoutine = new Routine({
        routines: routines
    });

    let id;
    
    await createdRoutine.save().then((resp) => {
        id = resp._id;
    });

    res.status(201);
    res.json({id: id});
};

const getRoutines = async (req, res, next) => {
    let routine = await Routine.findById(req.params.id);

    // Turns the response to a regular javascriptObject
    // How does it look if you don't do it?
    res.json(routine.toObject({getters: true}));
};

const updateRoutines = async (req, res, next) => {
    const routines = req.body;
    let routine = await Routine.findById(req.params.id);

    //Needed routine.routines
    routine.routines = routines;  

    await routine.save();

    res.status(200);
    res.json({newItem: routine});
};

exports.getRoutines = getRoutines;
exports.updateRoutines = updateRoutines;
exports.postRoutines = postRoutines;