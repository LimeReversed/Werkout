const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routinesSchema = new Schema({
    routines: [
        {
            id: String,
            name: String,
            lastDate: String,
            days: 
            [
                {
                    id: String,
                    name: String,
                    lastDate: String,
                    exercises:
                    [
                        {
                            id: String,
                            name: String,
                            lastDate: String,
                            image: String,
                            description: String,
                            showWeight: Boolean,
                            showReps: Boolean,
                            showTime: Boolean,
                            showRest: Boolean,
                            sets:
                            [
                                {
                                    id: String,
                                    logDate: String,
                                    placeholderWeight: Number,
                                    placeholderReps: Number,
                                    placeholderTime: String,
                                    placeholderRest: Number,
                                    weight: Number,
                                    reps: Number,
                                    time: String,
                                    rest: Number
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Routine', routinesSchema);