var admin = require("firebase-admin");
var serviceAccount = require("./werkout-738e3-firebase-adminsdk-zy66j-5ceefd20c0.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();

module.exports = auth;