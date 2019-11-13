import React, { useState } from 'react';
import { Button } from 'antd';

import { CreatePostingModal } from '../create-posting/create-posting-modal';
import { CompanyPostingsTable } from './company-postings-table';
import { CompanyPostingsData } from './company-postings-data';
import { CompanyBreadcrumb, CompanyCardContent } from '../../../shared';
import './style.less';

const breadcrumbRoutes: CompanyBreadcrumb[] = [
  { path: '/', title: 'Postings' },
];

export const CompanyPostingsView: React.FunctionComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <React.Fragment>
      <CompanyCardContent
        className="company-postings-card"
        breadcrumbs={breadcrumbRoutes}
        extra={
          <Button type="primary" onClick={() => setModalVisible(true)}>
            Post Position
          </Button>
        }
      >
        <CompanyPostingsData>
          {({ error, loading, data, loadMore }) => {
            if (error) {
              return <div>error</div>;
            }

            return (
              <React.Fragment>
                <CompanyPostingsTable
                  loading={loading}
                  data={
                    (data && data.findCurrentPostings) || {
                      count: 0,
                      postings: [],
                    }
                  }
                  onLoadMore={loadMore}
                />
              </React.Fragment>
            );
          }}
        </CompanyPostingsData>
      </CompanyCardContent>
      <CreatePostingModal visible={modalVisible} setVisible={setModalVisible} />
    </React.Fragment>
  );
};
