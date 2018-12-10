/*jshint esnext: true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, process, __dirname*/

import * as express from 'express';
import * as path from 'path';
import { SearchRoute } from './routes';

export class InitServer {
  rest: any;
  searchRoute: SearchRoute;
  constructor() {
    this.rest = express.Router();
    this.searchRoute = new SearchRoute();
    this.init();
  }
  init(): void {
    // if a request is made to the api endpoint
    //send back a json file documenting the REST API
    this.rest.get('/', function(req: any, res: any) {
      res.sendFile(path.join(__dirname, './routes', 'api.json'));
    });

    // to enable monitoring of application status
    this.rest.get('/ping', function(req: any, res: any) {
      res.status(200).json({ message: 'pong' });
    });
    this.rest.use('/flights', this.searchRoute.router);
  }
}
