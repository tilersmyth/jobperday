interface Coords {
  lng: number;
  lat: number;
}

export interface UserLocation {
  locality: string;
  coords: Coords;
}
