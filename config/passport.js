import passport from "passport";
import local from "passport-local" 
import User from "../models/user.js"; 
import { createHash, isValidPassword } from "../utils/password.js";

const LocalStrategy = local.Strategy

const initializePassport = () => {
    passport.use(
        'register',
        new LocalStrategy(
            { 
                usernameField: 'email',
                passwordField: 'passwd',
                passReqToCallback: true 
            },
            async (req, username, password, done) => {
                try {
                    let user = await User.findOne({ email:username })
                    if (user) return done(null, false, { message: 'El correo electronico ya está registrado' })

                    const newUser = {
                        nombre: req.body.nombre,
                        password : createHash(password),
                        email:  req.body.email,
                        direccion: req.body.direccion,
                        edad: req.body.edad,
                        telefono: req.body.telefono,
                    }

                    try {
                        let result = await User.create(newUser);
                        return done(null, result);
                    } catch (error) {
                        req.app.get('logger').error(error);
                        done(error);
                    }
                } catch(err) {
                    req.app.get('logger').error(error);
                    done(err);
                }
            }
        )
    )

    passport.use(
        'login',
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'passwd',
        },
            async (username,password,done) => {
                 try {
                    let user = await User.findOne({ email:username});
                    if (!user) return done(null, false,{message:'Usuario o credenciales inválidas'})
                    if (!isValidPassword(user,password)) return done(null, false,{message:'Usuario o credenciales inválidas'})

                    return done(null, user)
                } catch (error) {
                    done(error);
                }
            }
        )
    )
    passport.serializeUser((user,done) => {
        done(null,user._id)
    })

    passport.deserializeUser((id,done) => {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    })
}

export {
    initializePassport
}
