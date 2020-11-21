module.exports.setFlash = function (req, res, next) {
    let success = req.session.success || "";
    let error = req.session.error || "";
    res.locals.flash = {
        'success': success,//req.flash('success'),
        'error': error //req.flash('error')
    }
    req.session.success = "";
    req.session.error = "";
    console.log("RES LOCALS FLASH : ", res.locals.flash);
    next();
}