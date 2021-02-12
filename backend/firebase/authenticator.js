const auth = require('../firebase/adminSetup.js');

const authenticateUser = async (req, res, next) => {
    try {
        const authHeader = req.get('Authorization');
        const token = authHeader.split(' ')[1];
        const decodedToken = await auth.verifyIdToken(token);
        // req.token = token;
        // req.decodedToken = decodedToken;

        // const firebaseId = decodedToken.uid;

        next();
        return
    }
    catch(error) {
        console.log("ERROR");
        console.log(error);
    }
}

exports.authenticateUser = authenticateUser;