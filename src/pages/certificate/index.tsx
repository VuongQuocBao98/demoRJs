// assets

import { useSnackbar } from 'notistack';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RemoteFolderMain } from 'src/components/@orbit/Folder/RemoteFolderMain';
import { FUNCTION_ROLE } from 'src/config-global';
import { useCertificate } from 'src/core/certificate/presentations';
import PageLayout from 'src/layouts/PageLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function CertificatePage() {
  const refFolder = useRef<any>(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { getListCertificate, deleteCertificate } = useCertificate();

  const handleClick = (id: string | number) => {
    navigate(`${PATH_DASHBOARD.certificates.root}/${id}`);
  };

  const handleDelete = async (ids: string[]) => {
    try {
      await deleteCertificate(ids[0]);
      refFolder?.current?.refetchTableData();
      enqueueSnackbar('Deleted');
    } catch (error) {}
  };

  return (
    <PageLayout
      roles={FUNCTION_ROLE.CERTIFICATE}
      title="Certificates"
      headerBreadCrumbsProps={{
        heading: 'Certificates',
      }}
    >
      <RemoteFolderMain
        ref={refFolder}
        fetcher={getListCertificate}
        onClickItem={handleClick}
        onDeleteItems={handleDelete}
      />
    </PageLayout>
  );
}
