import { Router } from 'express'
const router = Router()
import { 
    authRedirect, registerUser, loginUser, authLogin, logoutUser, 
    uploadPhoto, loginoauth, getUser, changeEmail, changeFirst, 
    changeLast, changeUsername, jwtauth, failLogin
} from '../../controllers/userController'
import { changePasswordProfile } from '../../controllers/userController'
import upload from '../../models/imageModel'
import passport from 'passport'

export default router

//get oauth
.get('/auth/42', passport.authenticate('42', {scope: 'public'}))
.get('/auth/redirect', passport.authenticate('42', {failureRedirect: '/api/users/ofail'}), authLogin)
.get('/auth/github', passport.authenticate('github', {scope: 'user'}))
.get('/auth/redirect2', passport.authenticate('github', {failureRedirect: '/api/users/ofail'}), authLogin)
.get('/redirect/:token', authRedirect, loginoauth)
.get('/ofail', failLogin)

//get
.get('/logout', logoutUser)
.get('/me/:user', jwtauth, getUser)
//post
.post('/signup', registerUser)
.post('/signin', loginUser)
.post('/upload', upload.single('photo'), uploadPhoto)
// .post('/upload', uploadPhoto)
.post('/update-username', changeUsername)
.post('/update-email', changeEmail)
.post('/update-last', changeLast)
.post('/update-first', changeFirst)
.post('/update-password', changePasswordProfile)

//delete