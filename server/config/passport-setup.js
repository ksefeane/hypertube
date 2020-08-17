import passport from 'passport'
import OAuth2Strategy from 'passport-oauth2'
import { keys } from './keys'

export default passport.use(
    new OAuth2Strategy({
        clientID: keys.wtc.clientID,
        clientSecret: keys.wtc.clientSecret,
        authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
        tokenURL: 'https://api.intra.42.fr/oauth/token',
        callbackURL: 'http://localhost:5000/api/users/auth/42/redirect'
        },
        function(accessToken, refreshToken, profile, cb) {
            User.findOrCreate({ exampleId: profile.id }, function (err, user) {
                return cb(err, user);
            });        
        }
    )
)