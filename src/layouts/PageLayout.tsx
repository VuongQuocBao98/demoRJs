import { ReactNode } from 'react';
// @mui
import { Container } from '@mui/material';
// components
import CustomBreadcrumbs, { CustomBreadcrumbsProps } from 'src/components/custom-breadcrumbs';
import Page from 'src/components/page';
import { useSettingsContext } from 'src/components/settings';
import RoleBasedGuard from 'src/auth/RoleBasedGuard';

type IProps = {
  title: string;
  headerBreadCrumbsProps?: CustomBreadcrumbsProps;
  children: ReactNode;
  roles?: string[];
};

export default function PageLayout({ title, children, headerBreadCrumbsProps, roles }: IProps) {
  const { themeStretch } = useSettingsContext();

  return (
    <RoleBasedGuard hasContent roles={roles}>
      <Page title={title}>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          {!!headerBreadCrumbsProps && <CustomBreadcrumbs {...headerBreadCrumbsProps} />}
          {children}
        </Container>
      </Page>
    </RoleBasedGuard>
  );
}
