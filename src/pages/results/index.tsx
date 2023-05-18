// assets

import { useSnackbar } from 'notistack';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RemoteFolderMain } from 'src/components/@orbit/Folder/RemoteFolderMain';
import { FUNCTION_ROLE } from 'src/config-global';
import { useResult } from 'src/core/result/presentations';
import PageLayout from 'src/layouts/PageLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function ResultPage() {
  const refFolder = useRef<any>(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { getListResult, deleteResult } = useResult();

  const handleClick = (id: string | number) => {
    navigate(`${PATH_DASHBOARD.results.root}/${id}`);
  };

  const handleDelete = async (ids: string[]) => {
    try {
      await deleteResult(ids[0]);
      refFolder?.current?.refetchTableData();
      enqueueSnackbar('Deleted');
    } catch (error) {}
  };

  return (
    <PageLayout
      roles={FUNCTION_ROLE.RESULTS}
      title="Results"
      headerBreadCrumbsProps={{
        heading: 'Results',
      }}
    >
      <RemoteFolderMain
        ref={refFolder}
        fetcher={getListResult}
        onClickItem={handleClick}
        onDeleteItems={handleDelete}
      />
    </PageLayout>
  );
}
