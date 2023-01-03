import { Request, Response } from 'express'
import * as nanoid from 'nanoid'
import { Url } from '../data/model/Url'

export class ShortUrlController {
    static async shortenUrl(req: Request, res: Response) {
        const url = req.body.url;

        try {
            let shortUrl: string
            let savedUrl = await Url.findOne({ originalUrl: url })
            if (savedUrl) {
                shortUrl = savedUrl.shortUrl
            } else {
                shortUrl = nanoid.nanoid()
                savedUrl = new Url({
                    shortUrl: shortUrl,
                    originalUrl: url
                })
                await savedUrl.save()
            }
            res.json({
                short_url: shortUrl,
                original_url: url
            })
        } catch (err) {
            console.log(err);
            res.status(500).json('Server Error');
        }
    }
}