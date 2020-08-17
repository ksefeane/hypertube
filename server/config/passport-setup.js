import passport from 'passport'
import Oauth2Strategy from 'passport-oauth2'
import { keys } from './keys'
import { User } from '../models/userModel'

export default passport.use(
    new Oauth2Strategy ({
        authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
        tokenURL: 'https://api.intra.42.fr/oauth/token',
        clientID: keys.wtc.clientID,
        clientSecret: keys.wtc.clientSecret,
        callbackURL: '/api/users/auth/42/redirect',
    }, (token, refreshToken, profile, cb) => {
        console.log(token)
        console.log(profile)
        cb(null, profile)
    })
)