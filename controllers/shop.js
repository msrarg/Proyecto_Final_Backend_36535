const login = (req, res) => {
    if (req.user) res.redirect('/dashboard'); 

    res.render("pages/login", {
        loggedIn: false,
    });
}

const signup = (req, res) => {
    if (req.user) res.redirect('/dashboard'); 

    res.render("pages/signup", {
        loggedIn: false,
    });
}

const logout = (req, res) => {
    if (req.user != undefined) {
        const name = req.user.nombre;
        req.session.destroy(() => {
            req.session = null;
            res.render("pages/logout", {
                loggedIn: false,
                userName: name,
            });
        });
    }else{
        res.redirect('/login'); 
    }
}


const dashboard = (req, res) => {
    res.render("pages/dashboard", {
        userLogged: req.user,
        loggedIn: true,
    });
}

const profile = (req, res) => {
    res.render("pages/profile", {
        userLogged: req.user,
        loggedIn: true,
    });
}

const cart = (req, res) => {
    res.render("pages/cart", {
        userLogged: req.user,
        loggedIn: true,
    });
}

export default {
    login,
    signup,
    logout,
    dashboard,
    profile,
    cart,
}
