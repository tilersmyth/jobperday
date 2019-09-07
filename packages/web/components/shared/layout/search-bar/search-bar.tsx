import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'antd';
import { ApolloConsumer } from 'react-apollo';

import './style.less';
import { ResponsiveWrapper } from '../responsive-wrapper';
import { Formik, Field } from 'formik';
import { SearchDocument } from '../../../../apollo/generated-components';
import { JobInput } from './job-input';
import { LocationInput } from './location-input';

export const SearchBar: React.FunctionComponent = () => {
  const [secondary, setSecondary] = useState('');

  const openSecondary = () => {
    if (window.innerWidth < 768) {
      setSecondary('open');
    }
  };

  const closeSecondary = () => setSecondary('');

  return (
    <div className="search-bar">
      <ResponsiveWrapper>
        <ApolloConsumer>
          {client => (
            <Formik
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async variables => {
                console.log(variables);
                try {
                  await client.query({
                    query: SearchDocument,
                    variables: {
                      input: {
                        keyword: variables.keyword,
                        location: {
                          lat: variables.lat,
                          lng: variables.lng,
                        },
                      },
                    },
                  });
                } catch (error) {
                  console.log(error);
                }
              }}
              initialValues={{
                keyword: '',
                lat: '',
                lng: '',
              }}
            >
              {({ handleSubmit, setFieldValue }) => (
                <Form layout="inline" onSubmit={handleSubmit}>
                  <Row gutter={16}>
                    <Col lg={{ span: 8 }} md={{ span: 8 }} sm={{ span: 24 }}>
                      <Field
                        name="keyword"
                        onFocus={openSecondary}
                        component={JobInput}
                      />
                    </Col>

                    <Col
                      lg={{ span: 8 }}
                      md={{ span: 8 }}
                      xs={{ span: 24 }}
                      className={`sb-mid-col sb-secondary ${secondary}`}
                    >
                      <Field
                        component={LocationInput}
                        setFieldValue={setFieldValue}
                      />
                    </Col>
                    <Col
                      lg={{ span: 5 }}
                      md={{ span: 7 }}
                      xs={{ span: 24 }}
                      className={`sb-secondary ${secondary}`}
                    >
                      <Form.Item>
                        <Row>
                          <Col md={{ span: 0 }} xs={{ span: 12 }}>
                            <Button
                              type="link"
                              className="sb-close-btn"
                              onClick={closeSecondary}
                            >
                              Close
                            </Button>
                          </Col>

                          <Col
                            md={{ span: 24 }}
                            xs={{ span: 12 }}
                            className="sb-col-btn"
                          >
                            <Button
                              htmlType="submit"
                              type="primary"
                              ghost={true}
                              size="large"
                            >
                              Find Jobs
                            </Button>
                          </Col>
                        </Row>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          )}
        </ApolloConsumer>
      </ResponsiveWrapper>
    </div>
  );
};
