process.env.NODE_ENV = 'development';

const moment = require('moment');
const expect = require('expect');
const config = require('config');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');

const should = chai.should();
const mocha = require('mocha')
const describe = mocha.describe;

const size = 10;
chai.use(chaiHttp);

const time = moment().format('YYYY-MM-DD')

const query = {
  "country": "UK",
  "currency": "GBP",
  "locale": "en-GB",
  "locationSchema": "Sky",
  "originplace": "EDI",
  "outbounddate": time,
  "inbounddate": time,
  "destinationplace": "LHR"
}

const oneWayQuery = {
  "country": "UK",
  "currency": "GBP",
  "locale": "en-GB",
  "locationSchema": "Sky",
  "originplace": "EDI",
  "outbounddate": time,
  "destinationplace": "LHR"
}

const keys = ['arrivalDateTime', 'departureDateTime', 'originStation', 'destinationStation', 'duration', 'stops', 'segments']
const legsKeys = ['outbound', 'inbound', 'pricingOptions']

describe('Itinerary', () => {

  describe('/POST Itinerary', () => {

    it('should give itinerary for one way', function (done) {
      this.timeout(5000);
      chai.request(server)
        .post('/api/flights/search')
        .send(oneWayQuery)
        .end((err, res) => {
          should.not.exist(err);
          const body = res.body;
          const legs = body[0].legs;
          const outbound = legs.outbound;
          const inbound = legs.inbound;

          body.should.be.a('array');
          expect(Object.keys(legs)).toEqual(legsKeys)
          expect(Object.keys(outbound)).toEqual(keys);
          expect(Object.keys(inbound).length).toEqual(0);
          done();
        });
    })

    it('should give itinerary for round trip', function (done) {
      this.timeout(90000);
      chai.request(server)
        .post('/api/flights/search')
        .send(query)
        .end((err, res) => {
          should.not.exist(err);
          const body = res.body;

          const legs = body[0].legs;
          const outbound = legs.outbound;
          const inbound = legs.inbound;

          body.should.be.a('array');

          expect(Object.keys(legs)).toEqual(legsKeys)
          expect(Object.keys(outbound)).toEqual(keys);
          expect(Object.keys(inbound)).toEqual(keys);
          done();
        });
    })
  });
});
