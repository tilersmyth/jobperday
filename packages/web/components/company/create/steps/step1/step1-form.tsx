import React, { forwardRef, useState } from 'react';
import { Row, Col, Button } from 'antd';
import { Formik, Field, FormikValues, FieldProps } from 'formik';
import InputMask from 'react-input-mask';
import {
  PropTypes,
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { updatedDiff } from 'deep-object-diff';
import { ApolloConsumer } from 'react-apollo';
import * as yup from 'yup';

import { InputField } from '../../../../shared/input/input-field';
import {
  CreateCompanyDocument,
  UpdateCreateCompanyDocument,
  FindCreateCompanyDocument,
} from '../../../../../apollo/generated-components';
import { CreateCompanySchema } from '../../../../../utils/yup-validation';
import { PlacesAutocompleteInput } from '../../../../shared/input/places-autocomplete-input';
import { STEP1_FORM_VALUES } from './step1-form-values';
import { googleAddressParser } from './step1-utils';
import { ErrorAlert } from '../../../../shared/alerts/error-alert';
import { SlugField } from './slug/slug-field';
import './style.less';

interface Props {
  companySlug?: string;
  formValues: any;
  nextStep: (id: string) => void;
}

const PlacesInputOptions: PropTypes['searchOptions'] = {
  types: ['address'],
  componentRestrictions: { country: 'us' },
};

const C: React.FunctionComponent<
  Props & React.RefAttributes<Formik<FormikValues>>
> = ({ formValues, companySlug, nextStep }, ref) => {
  const [addressError, setAddressError] = useState('');
  const [showFields, setShowFields] = useState(
    companySlug ? 'show_fields' : '',
  );

  const [validName, setValidName] = useState('');

  return (
    <ApolloConsumer>
      {client => (
        <Formik
          ref={ref}
          validateOnBlur={false}
          validateOnChange={false}
          enableReinitialize={true}
          onSubmit={async variables => {
            // Exclude formatted_address from inputs
            const { formatted_address, ...input } = variables;

            if (companySlug) {
              const updatedValues = updatedDiff(formValues, variables);

              // no form updates
              if (Object.entries(updatedValues).length === 0) {
                nextStep(companySlug);
                return;
              }

              const updatedResult = await client.mutate({
                mutation: UpdateCreateCompanyDocument,
                variables: {
                  input: { companySlug, ...updatedValues },
                },
                update(cache, { data: { updateCreateCompany } }) {
                  cache.writeQuery({
                    query: FindCreateCompanyDocument,
                    data: { findCreateCompany: updateCreateCompany },
                  });
                },
              });

              if (
                !updatedResult ||
                !updatedResult.data ||
                !updatedResult.data.updateCreateCompany
              ) {
                throw Error('Error updating company');
              }

              const existingCompany = updatedResult.data.updateCreateCompany;
              nextStep(existingCompany.slug);
              return;
            }

            try {
              const result = await client.mutate({
                mutation: CreateCompanyDocument,
                variables: {
                  input,
                },
              });

              if (!result || !result.data || !result.data.createCompany) {
                throw Error('Error creating company');
              }

              const newCompany = result.data.createCompany;
              nextStep(newCompany.slug);
            } catch (error) {
              throw error;
            }
          }}
          initialValues={formValues}
          validationSchema={CreateCompanySchema}
        >
          {({ handleSubmit, setFieldValue, values }) => {
            const HandlePlacesInputSelect = async (value: string) => {
              setAddressError('');
              setFieldValue('formatted_address', value);

              const geo = await geocodeByAddress(value);
              const coords = await getLatLng(geo[0]);
              const address = googleAddressParser(geo);
              address.coord_lat = coords.lat;
              address.coord_lng = coords.lng;
              address.phone = values.address.phone;

              try {
                await CreateCompanySchema.validate({
                  name: 'n/a',
                  address: {
                    ...address,
                    phone: '555-555-5555',
                  },
                });
                setFieldValue('address', address);
                setShowFields('show_fields');
              } catch (error) {
                const { path } = error.params;

                const message = `'${value}' is missing required field '${path
                  .split('.')
                  .pop()}'. Try again.`;
                setAddressError(message);
              } finally {
                setFieldValue('formatted_address', '');
              }
            };

            const HandlePlacesInputChange = (value: string) => {
              setFieldValue('formatted_address', value);
            };

            const editFields = () => {
              const addressReset = Object.assign(STEP1_FORM_VALUES.address, {
                phone: values.address.phone,
              });

              setFieldValue('address', addressReset);
              setShowFields('');
            };

            const onNameBlur = async (
              e: React.ChangeEvent<HTMLInputElement>,
            ) => {
              try {
                const { value } = e.target;

                await yup.reach(CreateCompanySchema, 'name').validate(value);

                setValidName(value);
              } catch (error) {
                console.log('fail');
              }
            };

            return (
              <form onSubmit={handleSubmit}>
                <Row gutter={16} className="form_top_fields">
                  <Col xl={{ span: 14 }}>
                    <Field
                      tabIndex="1"
                      name="name"
                      size="large"
                      placeholder="Company name"
                      className="name_field"
                      component={InputField}
                      onBlur={onNameBlur}
                    />
                  </Col>

                  <div className="slug_preview_wrapper sm">
                    <SlugField
                      nameValue={validName || formValues.name}
                      slugValue={values.slug}
                      setSlugValue={setFieldValue}
                    />
                  </div>

                  <Col xl={{ span: 10 }}>
                    <Field
                      name="address.phone"
                      render={(formikProps: any) => (
                        <InputMask mask="(999) 999 9999" {...formikProps.field}>
                          {(maskProps: any) => (
                            <InputField
                              tabIndex="2"
                              className="phone_field"
                              size="large"
                              placeholder="Phone"
                              {...maskProps}
                              {...formikProps}
                            />
                          )}
                        </InputMask>
                      )}
                    />
                  </Col>
                </Row>

                <div className="slug_preview_wrapper lg">
                  <SlugField
                    nameValue={validName || formValues.name}
                    slugValue={values.slug}
                    setSlugValue={setFieldValue}
                  />
                </div>

                <div className={`google_places_input ${showFields}`}>
                  <Field
                    name="formatted_address"
                    render={(formikProps: FieldProps) => (
                      <PlacesAutocompleteInput
                        {...formikProps}
                        searchOptions={PlacesInputOptions}
                        handleChange={HandlePlacesInputChange}
                        handleSelect={HandlePlacesInputSelect}
                        showError={true}
                        size="large"
                        placeholder="Address"
                      />
                    )}
                  />
                </div>
                <div className={`address_fields ${showFields}`}>
                  <Button
                    type="link"
                    className="change_fields_btn"
                    onClick={editFields}
                  >
                    change address
                  </Button>
                  <Field
                    name="address.street"
                    size="large"
                    component={InputField}
                    readOnly={true}
                  />
                  <Row gutter={16}>
                    <Col xl={{ span: 12 }}>
                      <Field
                        name="address.street2"
                        size="large"
                        placeholder="Street2 (optional)"
                        component={InputField}
                      />
                    </Col>
                    <Col md={{ span: 12 }}>
                      <Field
                        name="address.city"
                        size="large"
                        component={InputField}
                        readOnly={true}
                      />
                    </Col>
                    <Col xl={{ span: 8 }} md={{ span: 12 }}>
                      <Field
                        name="address.state"
                        size="large"
                        component={InputField}
                        readOnly={true}
                      />
                    </Col>
                    <Col xl={{ span: 8 }} md={{ span: 12 }}>
                      <Field
                        name="address.postal_code"
                        size="large"
                        component={InputField}
                        readOnly={true}
                      />
                    </Col>
                    <Col xl={{ span: 8 }} md={{ span: 12 }}>
                      <Field
                        name="address.country"
                        size="large"
                        component={InputField}
                        readOnly={true}
                      />
                    </Col>
                  </Row>
                </div>
                <Field name="coords_lat" type="hidden" />
                <Field name="coords_lng" type="hidden" />

                {addressError && (
                  <div className="address_error">
                    <ErrorAlert message={addressError} />
                  </div>
                )}
              </form>
            );
          }}
        </Formik>
      )}
    </ApolloConsumer>
  );
};

export const Step1Form = forwardRef<Formik, Props>(C);
