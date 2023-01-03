import express, { Express, Request, Response } from 'express'
import { ShortUrlRoute } from './route/ShortUrlRoute'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import mongoose from 'mongoose'

// init project
dotenv.config()
const app: Express = express()
const router = express.Router()
const port = process.env.PORT || 3000
mongoose.connect(process.env.MONGO_URI!, function (err) {
    if (err) {
        console.error(err)
    } else {
        console.log('Database connection successful')
    }
})

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// enables express json parser
app.use(express.urlencoded())
app.use(express.json())

// http://expressjs.com/en/starter/static-files.html
app.use('/public', express.static(path.join(__dirname, '../public')))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (_req: Request, res: Response) {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})

// Use Router
app.use('/api/', ShortUrlRoute.route(router))

// listen for requests :)
app.listen(port, function () {
    console.log(`Your app is listening on port ${port}`)
})