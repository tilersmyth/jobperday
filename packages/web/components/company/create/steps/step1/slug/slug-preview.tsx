import React from 'react';

import { GenerateCompanySlugComponent } from '../../../../../../apollo/generated-components';
import { SlugPreviewView } from './slug-preview-view';

interface Props {
  name: string;
  value: string;
  setSlug: (value: string) => void;
  editSlug: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export const SlugPreview: React.FunctionComponent<Props> = ({
  value,
  name,
  setSlug,
  editSlug,
}) => {
  const slugExists = value && name;

  return (
    <React.Fragment>
      {slugExists && <SlugPreviewView value={value} editSlug={editSlug} />}
      {!slugExists && (
        <GenerateCompanySlugComponent variables={{ name }}>
          {({ data }) => {
            if (!data || !data.generateCompanySlug) {
              return null;
            }

            setSlug(data.generateCompanySlug);

            return (
              <SlugPreviewView
                value={data.generateCompanySlug}
                editSlug={editSlug}
              />
            );
          }}
        </GenerateCompanySlugComponent>
      )}
    </React.Fragment>
  );
};
