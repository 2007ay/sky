/**
 * outer server wrapper
 */
/*jshint esnext: true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, module*/

import * as bodyParser from 'body-parser';
import * as config from 'config';
import * as path from 'path';
import * as express from 'express';
import { InitServer } from './app/InitServer';
import { ResponseUtility } from './app/utilities/ResponseUtilities';

export class ApplicationServer {
  app: any;
  initRoute: InitServer;
  constructor() {
    //init app routing
    this.initRoute = new InitServer();
    //init server
    this.initServer();
  }

  initServer() {
    this.app = express();

    function allowCrossDomain(req: any, res: any, next: any) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
      );
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
      );
      res.setHeader('Access-Control-Allow-Credentials', true);
      if (req.method === 'OPTIONS') {
        res.sendStatus(200);
      } else {
        next();
      }
    }

    this.app.set('json spaces', 2);
    this.app.use(allowCrossDomain);

    this.app.use(bodyParser.json()); // support json encoded bodies
    this.app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

    // preprocessing
    this.app.use(function(req: any, res: any, next: any) {
      req.util = ResponseUtility;
      req.__baseUrl = __dirname;
      next();
    });

    // attach our session security module and then the rest of the REST APIs

    this.app.use(config.get('server.apiroot'), this.initRoute.rest);

    // attach our client-side content
    this.app.use(express.static(path.join(__dirname, '../public')));
    // redirect requests to the main url to the client

    // post-routing: if the request didn't match any of our urls then return a 404
    this.app.use((req: any, res: any) => {
      console.log(`404: ${req.url}`);
      res.status(404).send('404: Not Found');
    });

    // final error handler //
    this.app.use((err: any, req: any, res: any, next: any) => {
      res.status(500).send(err);
    });

    //-- start the serve  r --//
    const port = config.get('server.port');
    this.app.listen(port, () => {
      console.log(`Server start at ${port}`);
    });

    this.app.use((err: any, req: any, res: any, next: any) => {
      if (res.headersSent) {
        return next(err);
      }
      res.status(500);
      res.render('error', { error: err });
    });
  }
}
let server = new ApplicationServer();
module.exports = server.app; // for testing
