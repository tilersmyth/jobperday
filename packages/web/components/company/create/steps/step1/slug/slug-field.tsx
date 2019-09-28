import React, { useState, useEffect } from 'react';

import { SlugPreview } from './slug-preview';
import { SlugForm } from './slug-form';
import './style.less';

interface Props {
  nameValue: string;
  slugValue: string;
  setSlugValue: (field: string, value: string) => void;
}

export const SlugField: React.FunctionComponent<Props> = ({
  nameValue,
  slugValue,
  setSlugValue,
}) => {
  const [editSlug, setEditSlug] = useState(false);
  const [slug, setSlug] = useState(slugValue);

  useEffect(() => setSlugValue('slug', slug), [slug]);

  const handleEditSlug = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setEditSlug(true);
  };

  return (
    <React.Fragment>
      {(slugValue || nameValue) && (
        <React.Fragment>
          {!editSlug && (
            <div className="preview_text">
              <SlugPreview
                value={slugValue}
                name={nameValue}
                editSlug={handleEditSlug}
                setSlug={setSlug}
              />
            </div>
          )}
          {editSlug && (
            <SlugForm
              editSlug={setEditSlug}
              setSlug={setSlug}
              value={slugValue}
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
