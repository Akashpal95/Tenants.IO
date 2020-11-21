
const admin = require('../config/admin');
module.exports.home = function (req, res) {
    // const sessionCookie = req.cookies['__session'] || "";
    // console.log("Inside home", res.locals.uid);
    // console.log("Session Coookie : ", sessionCookie);
    // res.render('home');
    // admin
    //     .auth()
    //     .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    //     .then(() => {
    //         console.log("Verified");
    //         res.render("home");
    //     })
    //     .catch((error) => {
    //         console.log("Un-Verified");
    //         // res.redirect("users/sign-in-up");
    //     });
    if (res.locals.uid) {
        console.log("Verified");
        res.render("home");
    } else {
        console.log("Un-Verified");
        res.redirect("users/sign-in");
    }
}
