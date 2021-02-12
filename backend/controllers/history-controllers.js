// httpRequest => historyItem-routes => Here

// Using
const History = require('../models/history');

const postHistory = async (req, res, next) => {
    // What exactly is this?
    const history = req.body;

    // This tells the data base which structure the data has. 
    // Defined in models/history.js
    const createdHistory = new History({
        history: history
    });

    let id;
    
    await createdHistory.save().then((resp) => {
        id = resp._id;
    });

    res.status(201);
    res.json({id: id});
};

const getHistory = async (req, res, next) => {
    let historyItem = await History.findById(req.params.id);

    // Turns the response to a regular javascriptObject
    // How does it look if you don't do it?
    res.json(historyItem.toObject({getters: true}));
};

const updateHistory = async (req, res, next) => {
    const history = req.body;
    let historyItem = await History.findById(req.params.id);

    //Needed historyItem.history
    historyItem.history = history;

    await historyItem.save();

    res.status(200);
    res.json({newItem: historyItem[0]});
};

exports.getHistory = getHistory;
exports.updateHistory = updateHistory;
exports.postHistory = postHistory;