import React, { useState } from 'react';
import { Button, Row, Col, Form, Input } from 'antd';
import { ApolloConsumer } from 'react-apollo';
import slugify from 'slug';

import { CompanySlugAvailableDocument } from '../../../../../../../apollo/generated-components';

interface Props {
  editSlug: React.Dispatch<React.SetStateAction<boolean>>;
  setSlug: (value: string) => void;
  value: string;
}

export const SlugForm: React.FunctionComponent<Props> = ({
  editSlug,
  setSlug,
  value,
}) => {
  const [fieldValue, setFieldValue] = useState(value);
  const [error, setError] = useState('');

  const onFieldBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slugged = slugify(e.target.value, { lower: true });
    setFieldValue(slugged);
  };

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(e.target.value);
  };

  return (
    <ApolloConsumer>
      {client => {
        const submitSlug = async () => {
          if (fieldValue.length < 4) {
            setError('Slug must be at least 3 characters');
          }

          // Dont hit server if value doesnt change
          if (value.trim() === fieldValue.trim()) {
            editSlug(false);
            return;
          }

          try {
            const { data } = await client.query({
              query: CompanySlugAvailableDocument,
              variables: { name: fieldValue },
            });

            if (!data || data.companySlugAvailable === undefined) {
              throw Error('Error generating slug');
            }

            if (!data.companySlugAvailable) {
              throw Error('Slug is not available');
            }

            setSlug(data.companySlugAvailable);
            editSlug(false);
          } catch (err) {
            setError(err.message);
          }
        };

        return (
          <Row gutter={16} style={{ marginTop: 24 }}>
            <Col xl={{ span: 16 }}>
              <Form.Item
                validateStatus={error ? 'error' : undefined}
                help={error}
              >
                <Input
                  placeholder="Company slug"
                  value={fieldValue}
                  onChange={onFieldChange}
                  onBlur={onFieldBlur}
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col xl={{ span: 8 }}>
              <Button.Group>
                <Button size="large" icon="check" onClick={submitSlug} />
                <Button
                  size="large"
                  icon="close"
                  onClick={() => editSlug(false)}
                />
              </Button.Group>
            </Col>
          </Row>
        );
      }}
    </ApolloConsumer>
  );
};
