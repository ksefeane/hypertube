import { Router } from 'express'
const router = Router()
import { info, listUsers, registerUser, loginUser, auth42 } from '../../controllers/userController'
import passport from 'passport'

export default router
//get
.get('/', listUsers)
.get('/auth/42', passport.authenticate('oauth2', {scope: 'public'}))
.get('/auth/42/redirect', passport.authenticate('oauth2', 
    {session: false, failureRedirect: '/api/users/signup'}), auth42)
.get('/logout', )
.get('/info', info)
//add
.post('/signup', registerUser)
.post('/signin', loginUser)
//delete
