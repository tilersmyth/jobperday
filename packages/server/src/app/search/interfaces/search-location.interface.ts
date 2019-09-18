interface Coords {
  lng: number;
  lat: number;
}

export interface SearchLocation {
  locality: string;
  coords: Coords;
}
