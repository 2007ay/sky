/*jshint esnext: true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, process*/

const Router = require('express').Router();
import { SearchRouteHandler } from '../handlers/SearchRouteHandler';

export class SearchRoute {
  router: any;
  handler: SearchRouteHandler;
  constructor() {
    this.router = Router;
    this.handler = new SearchRouteHandler();
    this.searchFlights = this.searchFlights.bind(this);
    this.router.post('/search', this.searchFlights);
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */

  async searchFlights(req: any, res: any) {
    let result = await this.handler.search(req.body);
    res.json(result);
  }
}
