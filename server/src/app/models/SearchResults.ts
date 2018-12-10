interface Props {
  Duration: string;
  OriginStation: number;
  DestinationStation: number;
  DepartureDateTime: string;
  ArrivalDateTime: string;
}

export interface PricingOption {
  Price: string;
  Agents: Array<number>;
}

export interface Itinerary {
  OutboundLegId: string;
  InboundLegId: string;
  PricingOptions: Array<PricingOption>;
}

export interface Legs extends Props {
  Arrival: string;
  Departure: String;
  Stops: Array<number>;
  SegmentIds: Array<number>;
}

export interface Place {
  Id: number;
  Code: string;
  Name: string;
}

export interface Segment extends Props {
  Id: number;
  Carrier: string;
}

export interface SearchResults {
  Itineraries: Array<Itinerary>;
  Places: Array<Place>;
  Segments: Array<Segment>;
  Legs: Array<Legs>;
}
