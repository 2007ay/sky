import { map, find } from 'underscore';
import { SearchResults, Legs, Itinerary, PricingOption } from '../models';

function formatPlaces(id: number, raw: SearchResults): any {
  const place: any = find(raw.Places, { Id: id }) || null;
  if (!place) {
    return {};
  }
  return {
    code: place.Code,
    name: place.Name
  };
}

function formatSegments(SegmentIds: Array<number>, raw: SearchResults): any {
  return map(SegmentIds, sid => {
    const segment: any = find(raw.Segments, { Id: sid });
    return {
      id: segment.Id,
      duration: segment.Duration,
      originStation: formatPlaces(segment.OriginStation, raw),
      destinationStation: formatPlaces(segment.DestinationStation, raw),
      departureDateTime: segment.DepartureDateTime,
      arrivalDateTime: segment.ArrivalDateTime,
      carrier: segment.Carrier
    };
  });
}

function formatLeg(leg: Legs, raw: any) {
  if (!leg) {
    return {};
  }

  return {
    arrivalDateTime: leg.Arrival,
    departureDateTime: leg.Departure,
    originStation: formatPlaces(leg.OriginStation, raw),
    destinationStation: formatPlaces(leg.DestinationStation, raw),
    duration: leg.Duration,
    stops: leg.Stops,
    segments: formatSegments(leg.SegmentIds, raw)
  };
}

function formatLegs(Legs: Array<Legs>, itinerary: Itinerary, raw: any): any {
  const outLeg: any = find(Legs, { Id: itinerary.OutboundLegId });
  const inLeg: any = find(Legs, { Id: itinerary.InboundLegId });
  return {
    outbound: formatLeg(outLeg, raw),
    inbound: formatLeg(inLeg, raw),
    pricingOptions: map(itinerary.PricingOptions, (option: PricingOption) => {
      return {
        price: option.Price,
        agents: map(option.Agents, id => {
          const agent: any = find(raw.Agents, { Id: id });
          return {
            name: agent.Name,
            imageUrl: agent.ImageUrl
          };
        })
      };
    })
  };
}

export function formatResult(raw: SearchResults): any {
  var result = map(raw.Itineraries, (it: Itinerary) => {
    return {
      legs: formatLegs(raw.Legs, it, raw)
    };
  });
  return result;
}
