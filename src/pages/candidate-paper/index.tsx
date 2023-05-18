// assets

import { useSnackbar } from 'notistack';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RemoteFolderMain } from 'src/components/@orbit/Folder/RemoteFolderMain';
import { FUNCTION_ROLE } from 'src/config-global';
import { useCandidatePaper } from 'src/core/candidate-paper/presentations';
import PageLayout from 'src/layouts/PageLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';

// ----------------------------------------------------------------------




export default function ResultPage() {
  const refFolder = useRef<any>(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { getListCandidatePaper, deleteCandidatePaper } = useCandidatePaper();

  const handleClick = (id: string | number) => {
    navigate(`${PATH_DASHBOARD.candidatePaper.root}/${id}`);
  };

  const handleDelete = async (ids: string[]) => {
    try {
      await deleteCandidatePaper(ids[0]);
      refFolder?.current?.refetchTableData();
      enqueueSnackbar('Deleted');
    } catch (error) { }
  };

  return (
    <PageLayout
      roles={FUNCTION_ROLE.CANDIDATE_PAPER}
      title="Candidates’Paper"
      headerBreadCrumbsProps={{
        heading: 'Candidates’Paper',
      }}
    >
      <RemoteFolderMain
        ref={refFolder}
        fetcher={getListCandidatePaper}
        onClickItem={handleClick}
        onDeleteItems={handleDelete}
      />
    </PageLayout>
  );
}
