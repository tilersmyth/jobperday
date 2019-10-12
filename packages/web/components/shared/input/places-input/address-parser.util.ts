const addressComponents: any = {
  street_number: 'street',
  route: 'street',
  neighborhood: 'city',
  locality: 'city',
  sublocality: 'city',
  administrative_area_level_1: 'state',
  country: 'country',
  postal_code: 'postal_code',
};

export const googleAddressParser = (
  initialValues: any,
  result: google.maps.GeocoderResult[],
) => {
  const { address_components, formatted_address } = result[0];

  return address_components.reduce(
    (acc: any, address: google.maps.GeocoderAddressComponent) => {
      if (formatted_address.includes(address.short_name)) {
        const componentTypes = Object.keys(addressComponents).find(key =>
          address.types.includes(key),
        );
        if (componentTypes) {
          const key = addressComponents[componentTypes];
          return {
            ...acc,
            [key]: acc[key]
              ? `${acc[key]} ${address.short_name}`
              : address.short_name,
          };
        }
      }

      return acc;
    },
    initialValues,
  );
};
