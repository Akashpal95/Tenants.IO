const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tenantsio.firebaseio.com",
});
// admin.initializeApp(functions.config().firebase);

module.exports = admin;