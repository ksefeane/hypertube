import express from 'express'
import { json, urlencoded } from 'body-parser'
import cors from 'cors'

const app = express()
const port = 5000

//setup path
import path from 'path'
app.use(express.static(path.join(__dirname, 'public')))

//middleware
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())

//initialize database
import db from './models/db'
db.init()

//maintain video library
import { maintainVideos } from './models/videoModel'
maintainVideos('server/public/videos/')

//setup cookies
import session from 'express-session'
import { sessionkeys } from './config/keys'
app.use(session(sessionkeys))

//setup passport
import passportSetup from './config/passport-setup'
app.use(passportSetup.initialize())
app.use(passportSetup.session())

import users from './routes/api/users'
import forgotpassword from './routes/api/forgotpassword'
import video from './routes/api/video'
import library from './routes/api/library'

app.use('/api/users', users)
app.use('/api/forgotpassword', forgotpassword)
app.use('/api/video', video)
app.use('/api/library', library)

app.listen(port, () => 
    console.log(`server listening on port ${port}...`))
