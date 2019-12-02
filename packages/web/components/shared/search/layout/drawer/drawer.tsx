import React from 'react';
import { Drawer } from 'antd';

import { SearchInput } from '../../../../../apollo/generated-components';
import { SearchFilterForm } from '../../form';

interface Props {
  visible: boolean;
  close: () => void;
  searchArgs: SearchInput;
  setSearchArgs: (args: SearchInput) => Promise<void>;
}

export const SearchDrawer: React.FunctionComponent<Props> = ({
  visible,
  close,
  searchArgs,
  setSearchArgs,
}) => (
  <Drawer
    title="Search Filter"
    placement="left"
    closable={true}
    onClose={close}
    visible={visible}
  >
    <SearchFilterForm searchArgs={searchArgs} setSearchArgs={setSearchArgs} />
  </Drawer>
);
