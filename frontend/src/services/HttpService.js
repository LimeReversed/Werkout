import md5 from 'md5';

let apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

export const requestToMongo = async (endPoint, tokenObject, method = "GET", object = undefined) => {
 
    try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}${endPoint}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',  
                Authorization: `Bearer ${tokenObject.idToken}`
            },
            body: JSON.stringify(object)
        }); 
        
        const responseData = await response.json();
        
        return responseData
        }
        catch(err){
            console.log(err);
        }
};

export const requestToFirebase = async (url, method = "GET", object = undefined) => {
    try{
        
        const response = await fetch(`${url}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(object)
    }); 
    
    const responseData = await response.json();
    
    return responseData
    }
    catch(err){
        console.log(err);
    }
};

export const signUp = async (email, password, setTokenObject, setUser) => {
    
    let success = false;

    let user = {
        email: email,
        password: md5(password),
        returnSecureToken: true
    }

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

    let savedTokenObject;
    let newRoutine = [];
    let newRoutineId;
    let newHistory = [];
    let newUser = {};

    await requestToFirebase(url, 'POST', user).then((tokenObject) => {

        if (tokenObject){
            setTokenObject(tokenObject);
            savedTokenObject = tokenObject;

        }

    });

    await requestToMongo('/routines', savedTokenObject, 'POST', newRoutine).then((resp) => {
        if (resp){
            newRoutineId = resp.id;
            newHistory = [];  
        }
    });

    await requestToMongo('/history', savedTokenObject, 'POST', newHistory).then((resp2) => {
        if (resp2){

            let newHistoryId = resp2.id;
            newUser = {
                email: user.email,
                routinesId: newRoutineId, 
                historyId: newHistoryId  
            }
        }
    });

    await requestToMongo('/user', savedTokenObject, 'POST', newUser).then(() => {
        setUser(newUser);
        success = true;
    });

    return success;
            
};

export const signIn = async (email, password, setTokenObject, setUser) => {

    let success = false;

    let user = {
        email: email,
        password: md5(password),
        returnSecureToken: true
    };

    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    let tokenObject;

    await requestToFirebase(url, 'POST', user).then((resp) => {
        if (resp){

            // Response is a token object
            setTokenObject(resp);
            tokenObject = resp;
            
        }        
    }); 

    await requestToMongo(`/getUser/${tokenObject.email}`, tokenObject).then((resp2) => {
        if (resp2){
            setUser(resp2);
            success = true;
            
        }
    });

    return success;
};

export const getIndexes = (query) => {

    let routine = query.get("routineIndex") === null ? 0 : query.get("routineIndex");  
    let day = query.get("dayIndex") === null ? 0 : query.get("dayIndex"); 
    let exercise = query.get("exerciseIndex") === null ? 0 : query.get("exerciseIndex");

    return {routine: Number(routine), day: Number(day), exercise: Number(exercise)}
}