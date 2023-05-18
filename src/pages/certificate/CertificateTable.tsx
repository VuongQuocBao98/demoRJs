// assets
import { Avatar, Button, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { RemoteDataTable } from 'src/components/@orbit/table';
import Iconify from 'src/components/iconify';
import { FUNCTION_ROLE } from 'src/config-global';
import { ICertificate } from 'src/core/certificate/domain';
import { useCertificate } from 'src/core/certificate/presentations';
import PageLayout from 'src/layouts/PageLayout';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {
    id: 'fullName',
    label: 'Full name',
    rowCell: {
      render: (datum: ICertificate) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={datum.fullName} src={datum.avatar} />
          <Typography variant="subtitle2">{datum.fullName}</Typography>
        </Stack>
      ),
    },
  },
  {
    id: 'identificationNumber',
    label: 'CCCD/CMT',
  },
  { id: 'examLevel', label: 'Result' },
  {
    id: 'certificate',
    label: 'Certificate',
    rowCell: {
      render: (datum: ICertificate) => (
        <Link
          component={RouterLink}
          to={datum.exam}
          sx={{ textDecoration: 'underline', color: '#2F80ED' }}
        >
          <Typography>Link</Typography>
        </Link>
      ),
    },
  },
];

const PageAction = () => {
  return (
    <Button variant="outlined" startIcon={<Iconify icon="eva:download-fill" />}>
      Export
    </Button>
  );
};

export default function Certificate() {
  const { getListCertificateTable } = useCertificate();

  const handleDeleteMany = (ids: any) => {
    console.log('ids', ids);
  };

  return (
    <PageLayout
      title="Certificates"
      roles={FUNCTION_ROLE.CERTIFICATE}
      headerBreadCrumbsProps={{
        heading: 'Certificates',
        action: <PageAction />,
      }}
    >
      <RemoteDataTable
        fetcher={getListCertificateTable}
        selectable
        columns={TABLE_HEAD as any}
        shouldPaginate={true}
        isHideOption
        handleDeleteMany={handleDeleteMany}
      />
    </PageLayout>
  );
}
