const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
    history: [
        {
            nameOfExercise: String,
            logs: 
            [
                {
                    logDate: String,
                    entries:
                    [
                        {
                            setNr: Number,
                            weight: String,
                            reps: String,
                            time: String,
                            rest: Number
                        }
                    ]
                }
            ]
        }
    ]
});

module.exports = mongoose.model('History', historySchema);