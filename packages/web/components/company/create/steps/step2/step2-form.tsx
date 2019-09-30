import React from 'react';
import { Row, Col, Upload, Icon } from 'antd';
import { Formik, Field } from 'formik';
import { ApolloConsumer } from 'react-apollo';
import { updatedDiff } from 'deep-object-diff';

import { InputField } from '../../../../shared/input/input-field';
import { CreateCompanyProfileSchema } from '../../../../../utils/yup-validation';
import { TextAreaField } from '../../../../shared/input/textarea-field';
import './style.less';
import {
  CreateCompanyProfileDocument,
  UpdateCreateCompanyProfileDocument,
  FindCreateCompanyProfileDocument,
} from '../../../../../apollo/generated-components';
import { CreateCompanyStepsFooter } from '../../steps-footer-view';

interface Props {
  companySlug: string;
  profileId?: string;
  formValues: any;
  nextStep: (slug: string) => void;
  lastStep: () => void;
}

export const Step2Form: React.FunctionComponent<Props> = ({
  formValues,
  companySlug,
  profileId,
  nextStep,
  lastStep,
}) => {
  return (
    <ApolloConsumer>
      {client => (
        <Formik
          validateOnBlur={false}
          validateOnChange={false}
          enableReinitialize={true}
          onSubmit={async variables => {
            if (profileId) {
              const updatedValues = updatedDiff(formValues, variables);

              // no form updates
              if (Object.entries(updatedValues).length === 0) {
                nextStep(companySlug);
                return;
              }

              const updatedResult = await client.mutate({
                mutation: UpdateCreateCompanyProfileDocument,
                variables: {
                  input: {
                    companySlug,
                    profile: { id: profileId, ...updatedValues },
                  },
                },
                update(cache, { data: { updateCreateCompanyProfile } }) {
                  cache.writeQuery({
                    query: FindCreateCompanyProfileDocument,
                    data: {
                      findCreateCompanyProfile: updateCreateCompanyProfile,
                    },
                  });
                },
              });

              if (
                !updatedResult ||
                !updatedResult.data ||
                !updatedResult.data.updateCreateCompanyProfile
              ) {
                throw Error('Error updating company');
              }

              nextStep(companySlug);
              return;
            }

            try {
              const result = await client.mutate({
                mutation: CreateCompanyProfileDocument,
                variables: {
                  input: { companySlug, profile: variables },
                },
              });

              if (
                !result ||
                !result.data ||
                !result.data.createCompanyProfile
              ) {
                throw Error('Error creating company profile');
              }

              const newProfile = result.data.createCompanyProfile;
              console.log(newProfile);
            } catch (error) {
              throw error;
            }
          }}
          initialValues={formValues}
          validationSchema={CreateCompanyProfileSchema}
        >
          {({ handleSubmit }) => {
            const uploadButton = (
              <div>
                <Icon type="picture" className="upload_placeholder" />
                <div className="ant-upload-text">Upload picture</div>
              </div>
            );

            const handleChange = (info: any) => {
              console.log(info);
            };

            return (
              <form
                onSubmit={handleSubmit}
                className="company_profile_form_setup"
              >
                <Row gutter={16}>
                  <Col md={{ span: 8 }} xl={{ span: 10 }}>
                    <Upload
                      name="profile_image"
                      listType="picture-card"
                      className="profile_uploader"
                      showUploadList={false}
                      onChange={handleChange}
                    >
                      {uploadButton}
                    </Upload>
                  </Col>
                  <Col md={{ span: 16 }} xl={{ span: 14 }}>
                    <Field
                      name="business_type"
                      size="large"
                      placeholder="Business type"
                      component={InputField}
                    />

                    <Field
                      name="about"
                      placeholder="Brief description"
                      autosize={{ maxRows: 4 }}
                      component={TextAreaField}
                      className="about_field"
                    />
                  </Col>
                </Row>
                <CreateCompanyStepsFooter step={1} lastStep={lastStep} />
              </form>
            );
          }}
        </Formik>
      )}
    </ApolloConsumer>
  );
};
