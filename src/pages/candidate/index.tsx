// assets

import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RemoteFolderMain } from 'src/components/@orbit/Folder/RemoteFolderMain';
import Iconify from 'src/components/iconify';
import { FUNCTION_ROLE } from 'src/config-global';
import { useCandidate } from 'src/core/candidate/presentations';
import PageLayout from 'src/layouts/PageLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';
import AddFolderDialog from 'src/sections/@dashboard/candidate/AddFolderDialog';



export default function Candidate() {
  const refFolder = useRef<any>(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [openCreateFolder, setOpenCreateFolder] = useState(false);

  const { getListCandidate, deleteCandidate } = useCandidate();

  const handleClick = (id: string | number) => {
    navigate(`${PATH_DASHBOARD.candidate.root}/${id}`);
  };

  const handleDelete = async (ids: string[]) => {
    try {
      await deleteCandidate(ids[0]);
      refFolder?.current?.refetchTableData();
      enqueueSnackbar('Deleted');
    } catch (error) { }
  };


  const handleOpenCreateFolder = () => {
    setOpenCreateFolder(true);
  };

  const handleCloseCreateFolder = () => {
    setOpenCreateFolder(false);
  };


  return (
    <PageLayout
      roles={FUNCTION_ROLE.CANDIDATE}
      title="Candidate"
      headerBreadCrumbsProps={{
        heading: 'Candidates',
        action: (
          <Button
            onClick={handleOpenCreateFolder}
            sx={{ borderColor: '#173664', color: '#173664' }}
            variant="outlined"
            startIcon={<Iconify icon={'eva:plus-fill'} />}
          >
            Add
          </Button>
        ),
      }}
    >
      <RemoteFolderMain
        ref={refFolder}
        fetcher={getListCandidate}
        onClickItem={handleClick}
        onDeleteItems={handleDelete}
      />
      <AddFolderDialog open={openCreateFolder} onClose={handleCloseCreateFolder} refFolder={refFolder} />
    </PageLayout>
  );
}
