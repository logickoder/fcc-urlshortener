import { Request, Response, NextFunction } from 'express'
import dns from 'dns'

const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
    '(\\#[-a-z\\d_]*)?$', 'i'
)

// Setting options for dns.lookup() method
const options: dns.LookupOptions = {
    all: true,
}

const error = { error: 'invalid url' }

export class UrlMiddleware {
    static validate(req: Request, res: Response, next: NextFunction) {
        // validate url schema first
        if (pattern.test(req.body.url)) {
            next()
            // dns.lookup(req.body.url, options, function (err) {
            //     if (err) {
            //         res.json(error)
            //     } else {
            //     }
            // })
        } else {
            res.json(error)
        }
    }
}