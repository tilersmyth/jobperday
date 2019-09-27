import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'antd';
import Router from 'next/router';
import { setCookie } from 'nookies';
import base64 from 'base-64';
import { Formik, Field } from 'formik';
import ReactResizeDetector from 'react-resize-detector';

import { ResponsiveWrapper } from '../responsive-wrapper';
import { JobInput } from './job-input';
import { LocationInput } from './location-input';
import { SearchInput } from '../../../../apollo/generated-components';
import { SearchDrawer } from './search-drawer';
import { searchToQuery } from '../../../../utils/search/search-query-map';
import './style.less';

interface Props {
  searchArgs: SearchInput;
  updateArgs: (args: SearchInput) => void | Promise<void>;
}

export const SearchBar: React.FunctionComponent<Props> = ({
  searchArgs,
  updateArgs,
}) => {
  const [secondary, setSecondary] = useState('');
  const [drawer, openDrawer] = useState(false);

  const onWidthResize = (width: number) => {
    // Clean up small screen behavior if resized
    if (width >= 992) {
      openDrawer(false);
      setSecondary('');
    }
  };

  const openSecondary = () => {
    if (window.innerWidth < 992) {
      setSecondary('open');
    }
  };

  const closeSecondary = () => setSecondary('');

  const handleDrawerArgs = async (args: SearchInput) => {
    updateArgs(args);
    // No set location indicates that current route is not search,
    // so we just need to update args state and not args in url
    if (args.location.locality) {
      const query = searchToQuery(args);
      await Router.push({
        pathname: '/search',
        query,
      });
    }
  };

  return (
    <React.Fragment>
      <div className="search-bar">
        <ResponsiveWrapper>
          <Formik
            enableReinitialize={true}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async variables => {
              const encoded = base64.encode(JSON.stringify(variables.location));

              setCookie({}, 'jpd_loc', encoded, {});

              const query = searchToQuery(variables);

              await updateArgs(variables);

              await Router.push({
                pathname: '/search',
                query,
              });
            }}
            initialValues={{
              ...searchArgs,
            }}
          >
            {({ handleSubmit, setFieldValue }) => (
              <Form layout="inline" onSubmit={handleSubmit}>
                <Row gutter={16}>
                  <Col lg={{ span: 8 }} sm={{ span: 22 }} xs={{ span: 21 }}>
                    <Field
                      name="search"
                      onFocus={openSecondary}
                      component={JobInput}
                    />
                  </Col>

                  <Col lg={{ span: 0 }} sm={{ span: 2 }} xs={{ span: 3 }}>
                    <div className="filter-btn-wrapper">
                      <Button
                        className="filter-btn"
                        icon="filter"
                        size="large"
                        onClick={() => openDrawer(true)}
                      />
                    </div>
                  </Col>

                  <Col
                    lg={{ span: 8 }}
                    xs={{ span: 24 }}
                    className={`sb-mid-col sb-secondary ${secondary}`}
                  >
                    <Field
                      location={searchArgs.location}
                      component={LocationInput}
                      setFieldValue={setFieldValue}
                    />
                  </Col>
                  <Col
                    lg={{ span: 5 }}
                    md={{ span: 24 }}
                    className={`sb-secondary ${secondary}`}
                  >
                    <Form.Item>
                      <Row>
                        <Col lg={{ span: 0 }} xs={{ span: 12 }}>
                          <Button
                            type="link"
                            className="sb-close-btn"
                            onClick={closeSecondary}
                          >
                            Close
                          </Button>
                        </Col>

                        <Col
                          lg={{ span: 24 }}
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
        </ResponsiveWrapper>
      </div>
      <SearchDrawer
        visible={drawer}
        searchArgs={searchArgs}
        updateArgs={handleDrawerArgs}
        close={() => openDrawer(false)}
      />

      <ReactResizeDetector handleWidth={true} onResize={onWidthResize} />
    </React.Fragment>
  );
};
