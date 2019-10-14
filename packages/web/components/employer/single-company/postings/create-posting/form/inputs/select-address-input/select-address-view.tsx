import React, { useState } from 'react';
import { Field } from 'formik';

import { SelectAddressInput } from './select-address-input';
import { SelectGooglePlacesInput } from './select-google-places-input';

interface Props {
  companySlug: string;
}

export const SelectAddressView: React.FunctionComponent<Props> = ({
  companySlug,
}) => {
  const [newAddress, setNewAddress] = useState(false);

  return (
    <React.Fragment>
      {!newAddress && (
        <Field
          name="addressFormatted"
          size="large"
          placeholder="Location"
          companySlug={companySlug}
          switchAddress={setNewAddress}
          component={SelectAddressInput}
        />
      )}

      {newAddress && (
        <Field
          label="New Location"
          name="addressFormatted"
          size="large"
          placeholder="Start typing"
          component={SelectGooglePlacesInput}
        />
      )}
    </React.Fragment>
  );
};
