
const admin = require('../config/admin');
const db = admin.firestore();

module.exports.signInUp = (req, res) => {
    if (res.locals.uid) {
        res.redirect('back');
    }
    res.render('user_authentication');
}
module.exports.signIn = (req, res) => {
    if (res.locals.uid) {
        res.redirect('back');
    }
    // req.session.success = 'Please sign in to continue!';
    res.render('user_signin');
}
module.exports.signUp = (req, res) => {
    if (res.locals.uid) {
        res.redirect('back');
    }
    res.render('user_signup');
}
module.exports.sessionLogin = (req, res) => {
    // console.log('Req.body :  ', req.body);
    console.log("Inside session Login");
    const idToken = req.body.idToken.toString();
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    storeUserInDB(idToken);
    admin
        .auth()
        .createSessionCookie(idToken, { expiresIn })
        .then(
            (sessionCookie) => {
                console.log("Setting session cookie!!!");
                const options = { maxAge: expiresIn, httpOnly: true };
                // res.cookie("__session", sessionCookie, options);
                req.session.token = sessionCookie;
            },
            (error) => {
                console.log("ERROR : ", error);
                res.status(401).json({
                    message: "Unauthorized Access!!"
                });
            }
        )
        .then(() => {
            console.log("Redirecting to home");
            // req.flash('success', 'Sign In Successfull.');
            req.session.success = 'Sign In Successfull.';
            res.status(200).json({
                message: "Loggin Success!"
            });
        })

}
module.exports.sessionLogout = (req, res) => {
    // res.clearCookie("__session");
    req.session.token = "";
    req.session.success = 'You\'ve signed out.';
    res.redirect("/users/sign-in");
}
//To store user in database
const storeUserInDB = async (idToken) => {
    // console.log("storeUserInDB -> idToken", idToken)
    try {
        let decodedToken = await admin.auth().verifyIdToken(idToken);
        let uid = decodedToken.uid;
        // console.log("storeUserInDB -> uid", uid)
        let userData = await admin.auth().getUser(uid);
        // console.log("storeUserInDB -> userData", userData)
        let metadata = userData.metadata;
        // console.log("storeUserInDB -> metadata", metadata)
        let photoURL = userData.photoURL || "https://www.flaticon.com/svg/static/icons/svg/860/860784.svg";
        let emptyList = [];
        if (metadata.creationTime == metadata.lastSignInTime) {
            db
                .collection('owners')
                .doc(String(uid))
                .set({
                    name: userData.displayName,
                    email: userData.email,
                    photoURL,
                    propertyList: emptyList
                });
        } else {
            console.log("Old user logged in.");
        }

    } catch (err) {
        console.log("ERROR while storing user in db: ", err);
    }

}
//To render the find Account page
module.exports.forgotPassword = function (req, res) {
    if (res.locals.uid) {
        res.redirect('back');
    }
    return res.render('find_account');
}
