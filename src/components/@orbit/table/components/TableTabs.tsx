import { Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import Label from 'src/components/label';
import { MIN_PAGE } from 'src/config-global';
import { ColorSchema } from 'src/theme/palette';
import { useTableParamsUpdate } from '../contexts/TableParamsCtx';

// const getLengthByStatus = (status: string) =>
//   tableData.filter((item) => item.status === status).length;

// const TABS = [
//   { value: 'all', label: 'All', color: 'info', count: 10 },
//   { value: 'paid', label: 'Pass', color: 'success', count: 10 },
//   { value: 'unpaid', label: 'Fail', color: 'error', count: 10 },
// ] as const;

export type TabsType = {
  value: string;
  label: string;
  color: ColorSchema;
  count?: number;
};

type TableTabsProps = {
  tabs: TabsType[];
  onChangeTab?: (tab: string | number) => void;
};

const TableTabs = ({ tabs, onChangeTab }: TableTabsProps) => {
  const [filterStatus, setFilterStatus] = useState('all');

  const setTableParams = useTableParamsUpdate();

  const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    !!onChangeTab && onChangeTab(newValue);
    setTableParams((oldParams) => ({
      filters: {
        status: newValue,
      },
      pagination: {
        PageSize: oldParams.pagination!.PageSize,
        PageIndex: MIN_PAGE,
      },
    }));
    setFilterStatus(newValue);
  };

  return (
    <Tabs
      value={filterStatus}
      onChange={handleFilterStatus}
      sx={{
        px: 3,
        // bgcolor: 'background.neutral',
      }}
    >
      {tabs.map((tab: TabsType) => (
        <Tab
          key={tab.value}
          value={tab.value}
          label={tab.label}
          icon={
            <Label color={tab.color} sx={{ mr: 1 }}>
              {tab?.count}
            </Label>
          }
        />
      ))}
    </Tabs>
  );
};

export default TableTabs;
