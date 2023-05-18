// @mui
import { BreadcrumbsProps } from '@mui/material';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

export type BreadcrumbsLinkProps = {
  name?: string | ReactNode;
  href?: string;
  icon?: React.ReactElement;
};

export interface CustomBreadcrumbsProps extends BreadcrumbsProps {
  links?: BreadcrumbsLinkProps[];
  moreLink?: string[];
  heading?: string;
  activeLast?: boolean;
  action?: React.ReactNode;
  
}
