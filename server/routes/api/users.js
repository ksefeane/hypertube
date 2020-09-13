import { Router } from 'express'
const router = Router()
import { 
    authRedirect, listUsers, registerUser, loginUser, authLogin, logoutUser, uploadPhoto, loginoauth, getUser, changeEmail, changeFirst, changeLast, changeUsername, jwtauth, changePasswordProfile
} from '../../controllers/userController'
import upload from '../../models/imageModel'
import passport from 'passport'

export default router

//get oauth
.get('/auth/42', passport.authenticate('42', {scope: 'public'}))
.get('/auth/redirect', passport.authenticate('42', {failureRedirect: '/api/users/signup'}), authLogin)
.get('/auth/github', passport.authenticate('github', {scope: 'user'}))
.get('/auth/redirect2', passport.authenticate('github', {failureRedirect: '/api/users/signup'}), authLogin)
.get('/redirect/:token', authRedirect, loginoauth)
//get
.get('/logout', logoutUser)
.get('/', listUsers)
.get('/me/:user', jwtauth, getUser)
//post
.post('/signup', registerUser)
.post('/signin', loginUser)
.post('/upload', upload.single('photo'), uploadPhoto)
.post('/update-username', changeUsername)
.post('/update-email', changeEmail)
.post('/update-last', changeLast)
.post('/update-first', changeFirst)
.post('/update-password', changePasswordProfile)

//delete