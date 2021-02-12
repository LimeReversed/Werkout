import * as actionTypes from './actions';
import {requestToMongo} from '../services/HttpService';
import {uid} from 'uid';

const createInitialState = () => {
    let tokenObject = window.localStorage.getItem('tokenObject') === null 
        ? {} 
        : JSON.parse(window.localStorage.getItem('tokenObject'));

    let user = window.localStorage.getItem('user') === null 
        ? {} 
        : JSON.parse(window.localStorage.getItem('user'));

    let routines = window.localStorage.getItem('routines') === null 
    ? [] 
    : JSON.parse(window.localStorage.getItem('routines'));

    let history = window.localStorage.getItem('history') === null 
    ? [] 
    : JSON.parse(window.localStorage.getItem('history'));

    return {
        tokenObject,
        user,
        routines,
        history
    }
}

const initialState = createInitialState();



/*eslint eqeqeq: 0*/

const reducer = ( state = initialState, action ) => {
    
    if (action.type === actionTypes.LOAD_ROUTINES){

        let result = {
            ...state,
            routines: action.routines
        }    

        window.localStorage.setItem('routines', JSON.stringify(result.routines));
        return result;
    }
    else if (action.type === actionTypes.LOAD_HISTORY){

        let result = {
            ...state,
            history: action.history
        }    

        window.localStorage.setItem('history', JSON.stringify(result.history));
        return result;
    }
    else if (action.type === actionTypes.SET_USER){
        
        let result = {...state, user: action.user};

        window.localStorage.setItem('user', JSON.stringify(result.user));
        return result;
    }
    else if (action.type === actionTypes.ADD_ROUTINE){

        let newRoutine = 
        [
            {
                id : uid(),
                name: action.newName,
                lastDate: "-",
                days: []
            }
        ];

        let result = {
            ...state,
            routines: state.routines.concat(newRoutine)
        };

        requestToMongo(`/routines/${state.user.routinesId}`, state.tokenObject, "PATCH", result.routines);
        window.localStorage.setItem('routines', JSON.stringify(result.routines));
        
        return result;
    }
    else if (action.type === actionTypes.REMOVE_ROUTINE){

        let copy = [...state.routines];
        copy.splice(action.removeIndex, 1);

        let result = {
            ...state,
            routines: copy
        }

        requestToMongo(`/routines/${state.user.routinesId}`, state.tokenObject, "PATCH", result.routines);
        window.localStorage.setItem('routines', JSON.stringify(result.routines));

        return result;
    }
    else if (action.type === actionTypes.ADD_DAY){
        let routinesCopy = [...state.routines];
        let daysCopy = [...routinesCopy[action.routineIndex].days];

        let newDay = 
        [
            {
                id : uid(),
                name: action.newName,
                lastDate: "-",
                exercises: []
            }
        ];

        const newDaysArray = [...daysCopy, ...newDay];
        routinesCopy[action.routineIndex].days = newDaysArray;

        let result = {
            ...state,
            routines: routinesCopy
        }

        requestToMongo(`/routines/${state.user.routinesId}`, state.tokenObject, "PATCH", result.routines);
        window.localStorage.setItem('routines', JSON.stringify(result.routines));

        return result;

    }
    else if (action.type === actionTypes.REMOVE_DAY){
        let routinesCopy = [...state.routines];
        let daysCopy = [...routinesCopy[action.routineIndex].days];
        
        daysCopy.splice(action.removeIndex, 1);
        routinesCopy[action.routineIndex].days = daysCopy;

        let result = {
            ...state,
            routines: routinesCopy
        }

        requestToMongo(`/routines/${state.user.routinesId}`, state.tokenObject, "PATCH", result.routines);
        window.localStorage.setItem('routines', JSON.stringify(result.routines));

        return result;

    }
    else if (action.type === actionTypes.ADD_EXERCISE){
        
        let routinesCopy = [...state.routines];
        let exercisesCopy = [...routinesCopy[action.routineIndex].days[action.dayIndex].exercises];

        let newExercise = 
        [
            {
                id: uid(),
                name: action.newName,
                lastDate: "-",
                image: "",
                description: "Enter your description here",
                showWeight: true,
                showReps: true,
                showTime: true,
                showRest: true,
                sets: []
            }
        ];

        const newExerciseArray = [...exercisesCopy, ...newExercise];
        routinesCopy[action.routineIndex].days[action.dayIndex].exercises = newExerciseArray;

        let result = {
            ...state,
            routines: routinesCopy
        }

        requestToMongo(`/routines/${state.user.routinesId}`, state.tokenObject, "PATCH", result.routines);
        window.localStorage.setItem('routines', JSON.stringify(result.routines));

        return result;
    }

    else if (action.type === actionTypes.REMOVE_EXERCISE){
        
        let routinesCopy = [...state.routines];
        let exercisesCopy = [...routinesCopy[action.routineIndex].days[action.dayIndex].exercises];

        exercisesCopy.splice(action.removeIndex, 1);
        routinesCopy[action.routineIndex].days[action.dayIndex].exercises = exercisesCopy;

        let result = {
            ...state,
            routines: routinesCopy
        }

        requestToMongo(`/routines/${state.user.routinesId}`, state.tokenObject, "PATCH", result.routines);
        window.localStorage.setItem('routines', JSON.stringify(result.routines));

        return result;
    }
    else if (action.type === actionTypes.UPDATE_SINGLE_EXERCISE){
        let routinesCopy = [...state.routines];
        routinesCopy[action.routineIndex].days[action.dayIndex].exercises[action.exerciseIndex].sets = action.newSetsArray;
        routinesCopy[action.routineIndex].days[action.dayIndex].exercises[action.exerciseIndex].description = action.newDescription;
        
        let result = {
            ...state,
            routines: routinesCopy
        }

        requestToMongo(`/routines/${state.user.routinesId}`, state.tokenObject, "PATCH", result.routines);
        window.localStorage.setItem('routines', JSON.stringify(result.routines));

        return result;
    }
    else if (action.type === actionTypes.ADD_SET){
        let routinesCopy = [...state.routines];
        let setsCopy = [...routinesCopy[action.routineIndex].days[action.dayIndex].exercises[action.exerciseIndex].sets];
        let newSet = {
            id: uid(),
            logDate: "-",
            placeholderWeight: 0,
            placeholderReps: 0,
            placeholderTime: "-",
            placeholderRest: 60,
            weight: 0,
            reps: 0,
            time: "",
            rest: 60
        };
 
        setsCopy.push(newSet);
        routinesCopy[action.routineIndex].days[action.dayIndex].exercises[action.exerciseIndex].sets = setsCopy;

        let result = {
            ...state,
            routines: routinesCopy
        }

        requestToMongo(`/routines/${state.user.routinesId}`, state.tokenObject, "PATCH", result.routines);
        window.localStorage.setItem('routines', JSON.stringify(result.routines));

        return result;
    }
    else if (action.type === actionTypes.REMOVE_SET){
        let routinesCopy = [...state.routines];
        let setsCopy = [...routinesCopy[action.routineIndex].days[action.dayIndex].exercises[action.exerciseIndex].sets];
        setsCopy.splice(action.setIndex, 1);
        routinesCopy[action.routineIndex].days[action.dayIndex].exercises[action.exerciseIndex].sets = setsCopy;

        let result = {
            ...state,
            routines: routinesCopy
        }

        requestToMongo(`/routines/${state.user.routinesId}`, state.tokenObject, "PATCH", result.routines);
        window.localStorage.setItem('routines', JSON.stringify(result.routines));

        return result;
    }
    else if (action.type === actionTypes.UPDATE_LAST_DATE){
        
        let currentDate = new Date().toLocaleDateString();
        
        let allRoutinesCopy = [...state.routines];
        let routineCopy = {...allRoutinesCopy[action.routineIndex]};
        routineCopy.lastDate = currentDate;

        let allDaysCopy = [...routineCopy.days];
        let dayCopy = {...allDaysCopy[action.dayIndex]};
        dayCopy.lastDate = currentDate;

        let allExercisesCopy = [...dayCopy.exercises];
        let exerciseCopy = {...allExercisesCopy[action.exerciseIndex]};
        exerciseCopy.lastDate = currentDate;

        allExercisesCopy[action.exerciseIndex] = exerciseCopy;

        allDaysCopy[action.dayIndex] = dayCopy;
        allDaysCopy[action.dayIndex].exercises = allExercisesCopy;
        
        allRoutinesCopy[action.routineIndex] = routineCopy;
        allRoutinesCopy[action.routineIndex].days = allDaysCopy;

        let result = {
            ...state,
            routines: allRoutinesCopy
        }

        requestToMongo(`/routines/${state.user.routinesId}`, state.tokenObject, "PATCH", result.routines);
        window.localStorage.setItem('routines', JSON.stringify(result.routines));

        return result;

    }
    else if (action.type === actionTypes.LOG_HISTORY){
     
        let historyCopy = [...state.history];

        let nameFoundAt = null;
        let dateFoundAt = null;
        let setFoundAt = null;

        // Check if name exists
        historyCopy.map((el, i) => 
        {
            if (el.nameOfExercise == action.nameOfExercise){
                nameFoundAt = i;

                // If name exists, check if date exists
                return el.logs.map((el2, j) => {
                    if (action.dateString == el2.logDate){
                        dateFoundAt = j;

                        // If date exists, check if the setNr exists
                        return el2.entries.map((el3, k) => {
                            if (action.setRow.setNr == el3.setNr){
                                setFoundAt = k;
                            }

                            return [];
                        })
                    }

                    return [];
                })
            }

            return [];
        });
        

        if (nameFoundAt === null){
            let newHistoryElement = {
                nameOfExercise: action.nameOfExercise,
                logs:
                [
                    {
                        logDate: new Date().toLocaleDateString(),
                        entries: [action.setRow]
                    }
                ]                    
            }

            historyCopy = historyCopy.concat([newHistoryElement]);
        }
        else if (dateFoundAt === null){

            let newLogElement = {
                logDate: new Date().toLocaleDateString(),
                entries: [action.setRow]
            };

            let logCopy = [...historyCopy[nameFoundAt].logs]
            logCopy.push(newLogElement);
            historyCopy[nameFoundAt].logs = logCopy;

        }
        else if (setFoundAt === null){
            // Add set
            let newEntryElement = action.setRow;
            let entriesCopy = [...historyCopy[nameFoundAt].logs[dateFoundAt].entries];
            entriesCopy.push(newEntryElement);
            historyCopy[nameFoundAt].logs[dateFoundAt].entries = entriesCopy;

        }
        else{
            // Update set
            historyCopy[nameFoundAt].logs[dateFoundAt].entries[setFoundAt] = action.setRow;

        }

        let result = {
            ...state,
            history: historyCopy
        }

        requestToMongo(`/history/${state.user.historyId}`, state.tokenObject, "PATCH", result.history);
        window.localStorage.setItem('history', JSON.stringify(result.history));

        return result;
    }
    else if (action.type === actionTypes.SET_TOKEN_OBJECT){
        let result = {
            ...state,
            tokenObject: action.tokenObject
        }

        window.localStorage.setItem('tokenObject', JSON.stringify(result.tokenObject));
        return result;
    }
    else if (action.type === actionTypes.LOG_OUT){
        return {...state, tokenObject: {}, user: {}, routines: [], history: []}
    }
    else {
        return state;
    }
};

export default reducer;