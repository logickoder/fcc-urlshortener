import { Router } from 'express'

import { UrlMiddleware } from '../middleware/UrlMiddleware'
import { ShortUrlController } from '../controller/ShortUrlController'

export class ShortUrlRoute {
  static route(router: Router): Router {
    /**
     * @route POST /api/shorturl
     * @param { string } example.body.url
     * @produces application/json
     */
    router
      .route('/shorturl')
      .post(UrlMiddleware.validate, ShortUrlController.shortenUrl)

    return router
  }
}
