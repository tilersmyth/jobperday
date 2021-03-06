import React from 'react';
import { Form, Row, Col, Button } from 'antd';
import { Field, FormikProps } from 'formik';
import cx from 'classnames';

import { SearchInput } from '../../../../../apollo';
import { SearchLocationInput, SearchJobInput } from './inputs';
import { Icon } from '../../../icon';
import styles from './style.less';

interface Props extends FormikProps<SearchInput> {
  secondary: string;
  setSecondary: (open: boolean) => void;
  openDrawer: (value: boolean) => void;
}

export const SearchHeaderForm: React.FunctionComponent<Props> = ({
  handleSubmit,
  setSecondary,
  secondary,
  openDrawer,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Row gutter={{ lg: 32, md: 16, sm: 8, xs: 8 }}>
        <Col
          xl={{ span: 7, offset: 3 }}
          lg={{ span: 8, offset: 1 }}
          sm={{ span: 22 }}
          xs={{ span: 21 }}
        >
          <Field
            name="search"
            component={SearchJobInput}
            onFocus={() => setSecondary(true)}
          />
        </Col>
        <Col
          xl={{ span: 0 }}
          lg={{ span: 0 }}
          sm={{ span: 2 }}
          xs={{ span: 3 }}
        >
          <Button size="large" block={true} onClick={() => openDrawer(true)}>
            <Icon type="filter-line" />
          </Button>
        </Col>
        <div
          className={cx({
            [styles.secondaryFields]: true,
            [styles.open]: secondary,
          })}
        >
          <Col
            xl={{ span: 7 }}
            lg={{ span: 8 }}
            xs={{ span: 24 }}
            className={styles.fieldItem}
          >
            <Field
              name="location.locality"
              size="large"
              placeholder="City, state or zip"
              component={SearchLocationInput}
            />
          </Col>
          <Col
            xl={{ span: 4 }}
            lg={{ span: 6 }}
            md={{ span: 24 }}
            xs={{ span: 24 }}
            className={styles.fieldItem}
          >
            <Row gutter={32}>
              <Col
                xl={{ span: 0 }}
                lg={{ span: 0 }}
                md={{ span: 18 }}
                xs={{ span: 16 }}
                className={styles.fieldItem}
              >
                <Button type="link" onClick={() => setSecondary(false)}>
                  Close
                </Button>
              </Col>
              <Col
                xl={{ span: 24 }}
                lg={{ span: 24 }}
                md={{ span: 6 }}
                xs={{ span: 8 }}
                className={styles.fieldItem}
              >
                <Button
                  htmlType="submit"
                  type="primary"
                  ghost={true}
                  size="large"
                  block={true}
                >
                  Find Jobs
                </Button>
              </Col>
            </Row>
          </Col>
        </div>
      </Row>
    </Form>
  );
};
