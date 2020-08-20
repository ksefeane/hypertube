import { Router } from 'express'
const router = Router()
import { listUsers, registerUser, loginUser, oauthLogin, logoutUser } from '../../controllers/userController'
import passport from 'passport'

export default router

//get
.get('/', listUsers)
.get('/auth/42', passport.authenticate('oauth2', {scope: 'public'}))
.get('/auth/github', passport.authenticate('oauth2', {scope: 'user'}))
.get('/auth/redirect', passport.authenticate('oauth2', 
    {session: false, failureRedirect: '/api/users/signup'}), oauthLogin)
.get('/logout', logoutUser)

//add
.post('/signup', registerUser)
.post('/signin', loginUser)

//delete