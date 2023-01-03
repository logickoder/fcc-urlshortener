import express, { Express, Request, Response } from 'express';
import { AddressInfo } from 'net'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'

// init project
dotenv.config()
const app: Express = express()
const port = process.env.PORT || 3000

function hasCode(string: String): number {
    var hash = 0,
        i, chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
        chr = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use('/public', express.static(path.join(__dirname, '../public')))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (_req: Request, res: Response) {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})

app.post('/api/shorturl', function (_req: Request, res: Response) {
    res.json({ message: "success" })
})

// listen for requests :)
app.listen(port, function () {
    console.log(`Your app is listening on port ${port}`)
})