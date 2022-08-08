const sessionChecker = (req, res, next) => {

    if (!req.isAuthenticated()) return res.redirect('/login');

   next();
}

export {
    sessionChecker
}