// assets
import { useState } from 'react';

import { Button, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import Actions from 'src/components/@orbit/Action';
import { FilterOptionType, RemoteDataTable, TableFilterOptionProps } from 'src/components/@orbit/table';
import Iconify from 'src/components/iconify';
import { FUNCTION_ROLE } from 'src/config-global';
import { ICandidate } from 'src/core/candidate/domain';
import { useCandidate } from 'src/core/candidate/presentations';
import PageLayout from 'src/layouts/PageLayout';
import { getListProfileCollectionPoint } from 'src/redux/slices/ProfileCollectionPoint';
import { dispatch } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import FileNewFolderDialog from 'src/sections/@dashboard/candidate/UpLoadFile';
import { fDate } from 'src/utils/formatTime';

const TABLE_FILTERS = [
  {
    compType: FilterOptionType.Select,
    metadata: {
      id: 'address',
      label: 'Điểm thu hồ sơ',
      defaultValue: [],
      options: [
        { name: 'All', value: '' },
        { name: '265', value: '265' },
        { name: '365', value: '365' },
      ],
      displayKey: 'name',
      valueKey: 'value',
      multiple: true,
    },
    compProps: {
      sx: (theme) => ({
        [theme.breakpoints.up('sm')]: {
          maxWidth: 160,
        },
      }),
    },
  },
  {
    compType: FilterOptionType.Input,
    metadata: {
      id: 'SearchContent',
      label: '',
      // defaultValue: '',
    },
    compProps: {
      placeholder: 'Nhập từ khóa tìm kiếm',
      fullWidth: true,
      sx: (theme) => ({
        [theme.breakpoints.up('sm')]: {
          maxWidth: 300,
        },
      }),
    },
  },
] as TableFilterOptionProps[];

const TABLE_HEAD = [
  { id: 'fullName', label: 'Full name' },
  {
    id: 'gender',
    label: 'Gender',
    rowCell: {
      render: (datum: ICandidate) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography>{datum.gender === 1 ? 'Men' : 'Women'}</Typography>
        </Stack>
      ),
    },
  },
  {
    id: 'dob',
    label: 'Date of birth',
    rowCell: {},
  },
  { id: 'identificationNumber', label: 'Citizen Identification' },
  { id: 'collectPointName', label: 'collection Point' },
  {
    id: 'linkTest',
    label: 'Link',
    rowCell: {
      render: (datum: ICandidate) => (
        <Link
          component={RouterLink}
          to={datum.linkTest}
          sx={{ textDecoration: 'underline', textTransform: 'uppercase', color: '#2F80ED' }}
        >
          {datum.linkTest}
        </Link>
      ),
    },
  },
  { id: 'created', label: 'Creating date',rowCell: {
    render: (datum: ICandidate) => <Typography noWrap>{fDate(datum.created)}</Typography>,
  }, },
  {
    id: 'action',
    label: '',
    rowCell: {
      render: (datum: ICandidate) => (
        <Actions idx={datum.id!} path={PATH_DASHBOARD.candidate.root} />
      ),
    },
  },
];

export default function Candidate() {
  const [openUploadFile, setOpenUploadFile] = useState(false);
  const { id } = useParams();

  const { getListCandidateTable } = useCandidate();

  const handleCloseUploadFile = () => {
    setOpenUploadFile(false);
  };

  const handleOpenUploadFile = async () => {
    const res = await dispatch(getListProfileCollectionPoint({}));
    // console.log('sss',res);

    setOpenUploadFile(true);
  };

  const handleDeleteMany = (ids: any) => {
    console.log('ids', ids);
  };

  return (
    <PageLayout
      roles={FUNCTION_ROLE.CANDIDATE}
      title="Candidate"
      headerBreadCrumbsProps={{
        heading: 'Candidate',
        action: (
          <div>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:cloud-upload-fill" />}
              sx={{ mr: 1, bgcolor: '#173664' }}
              onClick={handleOpenUploadFile}
            >
              Import
            </Button>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="eva:cloud-upload-fill" />}
              sx={{ mr: 1, borderColor: '#173664', color: '#173664' }}
              onClick={handleOpenUploadFile}
            >
              Export
            </Button>

            <Link component={RouterLink} to={`${PATH_DASHBOARD.candidate.root}/${id}/add`}>
              <Button
                sx={{ borderColor: '#173664', color: '#173664' }}
                variant="outlined"
                startIcon={<Iconify icon={'eva:plus-fill'} />}
              >
                Add
              </Button>
            </Link>
          </div>
        ),
      }}
    >
      <FileNewFolderDialog open={openUploadFile} onClose={handleCloseUploadFile} />

      <RemoteDataTable
        fetcher={getListCandidateTable}
        selectable
        columns={TABLE_HEAD as any}
        shouldPaginate={true}
        filters={TABLE_FILTERS}
        isAlwaysShowToolbar
        isHideOption
        // tabs={TABS}
        handleDeleteMany={handleDeleteMany}
      />
    </PageLayout>
  );
}
