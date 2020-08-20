import passport from 'passport'
import Oauth2Strategy from 'passport-oauth2'
import { keys } from './keys'
import { findOrCreate } from '../models/userModel'

let client = new Oauth2Strategy ({
        authorizationURL: 'https://api.intra.42.fr/oauth/authorize',
        tokenURL: 'https://api.intra.42.fr/oauth/token',
        clientID: keys.wtc.clientID,
        clientSecret: keys.wtc.clientSecret,
        callbackURL: '/api/users/auth/42/redirect',
        scope: 'profile'
    }, async (token, refreshToken, params, profile, callback) => {
        callback(null, await findOrCreate(profile))
})

client.userProfile = function (accesstoken, done) {
    // choose your own adventure, or use the Strategy's oauth client
    this._oauth2._request("GET", "https://api.intra.42.fr/v2/me", null, null, accesstoken, (err, data) => {
      if (err) { return done(err); }
      try {
          data = JSON.parse( data );
      }
      catch(e) {
        return done(e);
      }
      done(null, data);
    })
}

export default passport.use(client)