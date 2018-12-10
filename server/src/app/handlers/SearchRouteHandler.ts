/*jshint esnext: true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global require, process, _*/

const config = require('config');
import { stringify } from 'querystring';
const fetch = require('node-fetch');
import { formatResult } from './SearchFormatter';
import { resolve } from 'url';

export class SearchRouteHandler {
  cache = {};
  skyscannerApi = config.get('skyscanner.skyscannerApi');
  apiKey = config.get('skyscanner.apiKey');
  PRICING_URL = `${this.skyscannerApi}/apiservices/pricing/v1.0`;
  POLL_DELAY = 1000;
  STATUS_CODES = {
    CREATED: 201,
    NOT_MODIFIED: 304
  };
  constructor() {}

  throttle(): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, this.POLL_DELAY));
  }

  formatParams(params: any): any {
    return stringify({
      country: 'UK',
      locale: 'en-GB',
      locationSchema: 'Sky',
      apiKey: this.apiKey,
      ...params
    });
  }

  async poll(location: any) {
    await this.throttle();
    try {
      console.log('Polling results..');
      const response = await fetch(`${location}?apikey=${this.apiKey}`);
      if (response.status === this.STATUS_CODES.NOT_MODIFIED) {
        return this.cache;
      }
      const body = await response.json();
      this.cache = body;
      return body;
    } catch (err) {
      throw err;
    }
  }

  async getResults(location: any): Promise<any> {
    try {
      const response = await this.poll(location);
      if (response.Status && response.Status === 'UpdatesComplete') {
        return response;
      }
      return await this.getResults(location);
    } catch (err) {
      throw err;
    }
  }

  async createSession(params: any) {
    try {
      const response = await fetch(this.PRICING_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: this.formatParams(params)
      });
      if (response.status !== this.STATUS_CODES.CREATED) {
        const json = await response.json();
        throw new Error(JSON.stringify(json));
      }
      return response.headers.get('location');
    } catch (err) {
      throw err;
    }
  }

  async search(params: any) {
    try {
      const locationToPoll = await this.createSession(params);
      const result = await this.getResults(locationToPoll);
      return formatResult(result);
    } catch (err) {
      throw err;
    }
  }
}
