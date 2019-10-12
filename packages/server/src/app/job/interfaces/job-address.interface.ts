export interface JobAddress {
  id: string;
  street: string;
  street2?: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  coord_lat: number;
  coord_lng: number;
}
