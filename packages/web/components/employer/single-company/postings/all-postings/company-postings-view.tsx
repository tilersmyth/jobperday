import React, { useState } from 'react';
import { Button } from 'antd';
import { postingPaginationConfig } from '@jobperday/common';

import { CreatePostingModal } from '../create-posting/create-posting-modal';
import { CompanyPostingsTable } from './company-postings-table';
import { CompanyPostingsData } from './company-postings-data';
import { CompanyBreadcrumb, CompanyCardContent } from '../../../shared';
import './style.less';

interface Props {
  companySlug: string;
}

const breadcrumbRoutes: CompanyBreadcrumb[] = [
  { path: '/', title: 'Postings' },
];

// Results to show per page
const queryLimit: number = postingPaginationConfig.limit;

export const CompanyPostingsView: React.FunctionComponent<Props> = ({
  companySlug,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <React.Fragment>
      <CompanyCardContent
        className="company-postings-card"
        breadcrumbs={breadcrumbRoutes}
        companySlug={companySlug}
        extra={
          <Button type="primary" onClick={() => setModalVisible(true)}>
            Post Position
          </Button>
        }
      >
        <CompanyPostingsData variables={{ companySlug, input: {} }}>
          {({ error, loading, data, fetchMore }) => {
            if (error) {
              return <div>error</div>;
            }

            return (
              <CompanyPostingsTable
                companySlug={companySlug}
                loading={loading}
                data={
                  (data && data.findCurrentPostings) || {
                    count: 0,
                    postings: [],
                  }
                }
                onLoadMore={({ current }) => {
                  const skip = current ? queryLimit * (current - 1) : 0;
                  return {
                    page: current,
                    client: fetchMore({
                      variables: {
                        companySlug,
                        input: {
                          skip,
                          limit: queryLimit,
                        },
                      },
                      updateQuery: (prev, { fetchMoreResult }) => {
                        if (!fetchMoreResult) {
                          return prev;
                        }

                        return Object.assign({}, prev, {
                          count: prev.findCurrentPostings.count,
                          postings: [
                            ...prev.findCurrentPostings.postings,
                            ...fetchMoreResult.findCurrentPostings.postings,
                          ],
                        });
                      },
                    }),
                  };
                }}
              />
            );
          }}
        </CompanyPostingsData>
      </CompanyCardContent>
      <CreatePostingModal
        companySlug={companySlug}
        visible={modalVisible}
        setVisible={setModalVisible}
      />
    </React.Fragment>
  );
};
