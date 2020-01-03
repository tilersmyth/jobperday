interface Address {
  street: string;
  street2?: string | null;
  city: string;
  state: string;
  postal_code: string;
  country?: string;
}

export const addressFormatter = (c: Address) => {
  return `${c.street}, ${c.street2 ? `${c.street2}, ` : ``}${c.city}, ${
    c.state
  }, ${c.postal_code}${c.country ? `, ${c.country}` : ``}`;
};
