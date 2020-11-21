const functions = require('firebase-functions');
const session = require('express-session');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000; //port 80 for production level code
const expressLayouts = require('express-ejs-layouts')
const cors = require('cors');
const admin = require('./config/admin');
const FirebaseStore = require('connect-session-firebase')(session);


const flash = require('connect-flash');
const customMiddleware = require('./config/middleware');

// app.use(cors());
app.use(expressLayouts);


app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());


// app.use(express.static('./assets'));

//Extract Style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//Set session for flash
app.use(session({
    store: new FirebaseStore({
        database: admin.database()
    }),
    name: "__session",
    //TODO change the secret before deployment
    secret: 'blahsomething',
    saveUninitialized: true, //When there is a session is not initialised i.e. user didn't login don't send extra data in cookie
    resave: true, //Identity is already established session data is present don't re-write the same thing
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

//For flash messages
// app.use(flash());
app.use(customMiddleware.setFlash);

const setAuthenticatedUser = (req, res, next) => {
    // const sessionCookie = req.cookies['__session'] || "";
    const sessionCookie = req.session.token || "";
    console.log("setAuthenticatedUser -> sessionCookie", sessionCookie)
    // console.log("")
    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((decodedToken) => {
            let uid = decodedToken.uid;
            console.log("setAuthenticatedUser -> uid", uid)
            res.locals.uid = uid;
            next();
        })
        .catch((error) => {
            console.log("Error  :", error);
            console.log("User not set!");
            next();
        });
}

app.use(setAuthenticatedUser);

//use express router
app.use('/', require('./routes'));

// app.listen(port, function (err) {
//     if (err) {
//         console.log(`Error in running the server : ${err}`);
//     }
//     console.log(`Server is running on port : ${port}`);
// });

exports.app = functions.https.onRequest(app);