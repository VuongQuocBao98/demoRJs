import { MouseEventHandler } from 'react';
// @mui
import { Toolbar, ToolbarProps } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import { TableFilterBar } from './filter/TableFilterBar';
// table-contexts

import { TableFilterOptionProps } from './filter/options/types';
// hooks
import useResponsive from 'src/hooks/useResponsive';

// ----------------------------------------------------------------------

interface Props extends ToolbarProps {
  showEmptyToolBar?: boolean;
}

const RootStyle = styled(Toolbar, {
  shouldForwardProp: (prop) => prop !== 'showEmptyToolBar',
})<Props>(({ showEmptyToolBar, theme }) => {
  const isDesktop = useResponsive('up', 'sm');

  return {
    height: showEmptyToolBar ? 64 : 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '0 !important',
    paddingTop: isDesktop ? theme.spacing(0) : theme.spacing(2),
    minHeight: showEmptyToolBar ? 64 : '80px !important',
  };
});

// ----------------------------------------------------------------------

export type TableToolBarProps = {
  selectable: boolean;
  primaryAction?: {
    action: MouseEventHandler<HTMLButtonElement>;
    icon: string;
    title: string;
  };
  filters?: TableFilterOptionProps[];
};

export function TableToolBar({ selectable, primaryAction, filters }: TableToolBarProps) {
  const shouldShowToolBar = !!filters;

  return (
    <>
      {!!filters && (
        <RootStyle showEmptyToolBar={!shouldShowToolBar}>
          <TableFilterBar options={filters} />
        </RootStyle>
      )}
    </>
  );
}
