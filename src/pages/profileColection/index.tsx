// assets
import { useEffect, useState } from 'react';

import { Button, Link } from '@mui/material';
import { format } from 'date-fns';
import { Link as RouterLink } from 'react-router-dom';
import { StaticDataTable, TableFilterOptionProps } from 'src/components/@orbit/table';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { useTable } from 'src/components/table';
import PageLayout from 'src/layouts/PageLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';
import FileNewFolderDialog from 'src/sections/@dashboard/candidate/UpLoadFile';
import mock from 'src/_mock/_mock';
import { FUNCTION_ROLE } from 'src/config-global';
import Actions from 'src/components/@orbit/Action';
import { getListProfileCollectionPoint } from 'src/redux/slices/ProfileCollectionPoint';
import { useDispatch, useSelector } from '../../redux/store';
import { IResult } from 'src/core/result/domain';
import { ReduxDataTable } from 'src/components/@orbit/table/components/ReduxDataTable';


// ----------------------------------------------------------------------
const STATUS_ARRAY = ['Active', 'Inactive'];

const TABLE_HEAD = [
  { id: 'locationName', label: 'Location exam' },
  { id: 'fullName', label: 'Representative' },
  { id: 'organizationAddress', label: 'Address' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone' },
  {
    id: 'status',
    label: 'Status',
    rowCell: {
      render: (datum: IResult) => (
        <Label
          variant="soft"
          color={(datum.status === 0 && 'success') || (datum.status === 1 && 'error') || 'default'}
        >
          {STATUS_ARRAY[datum.status]}
        </Label>
      ),
    },
  },
  {
    id: 'action', label: '', rowCell: {
      render: (datum: IResult) => (
        <Actions
          idx={datum.id!}
          path={PATH_DASHBOARD.profileColection.root}
          // OnEdit={HandleEdit}
          // onDelete={HandleDelete}
        />
      ),
    },
  },
];

const TABLE_FILTERS = [
  // {
  //   compType: FilterOptionType.Select,
  //   metadata: {
  //     id: 'phoneNumber',
  //     label: 'Search by phone number',
  //     defaultValue: [],
  //     options: [
  //       { name: 'All', value: '' },
  //       { name: '265', value: '265' },
  //       { name: '365', value: '365' },
  //     ],
  //     displayKey: 'name',
  //     valueKey: 'value',
  //     multiple: true,
  //   },
  //   compProps: {
  //     sx: (theme) => ({
  //       [theme.breakpoints.up('sm')]: {
  //         width: 250,
  //       },
  //     }),
  //   },
  //   filterFunc: (datum: ISchedule, value) => datum.phoneNumber.indexOf(value) > -1,
  // },
] as TableFilterOptionProps[];

export default function ProfileColection() {
  const dispatch = useDispatch();
  const table = useTable({ defaultRowsPerPage: 10 });

  const [openUploadFile, setOpenUploadFile] = useState(false);


  const [filterName, setFilterName] = useState('');

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    table.setPage(0);
    setFilterName(event.target.value);
  };

  const handleCloseUploadFile = () => {
    setOpenUploadFile(false);
  };

  const handleOpenUploadFile = () => {
    setOpenUploadFile(true);
  };
  const { loading, dataList }: any = useSelector((state: any) => state.profileColectionPoint);





  const fetchedData = {
    data: dataList.items || [],
    total: dataList?.totalItem || 0,
    totalPages: dataList?.totalPage || 0,
  };

    


  return (
    <PageLayout
      title="Profile Collection Point"
      roles={FUNCTION_ROLE.PROFILE_COLLECTION}
      headerBreadCrumbsProps={{
        heading: 'Profile Collection Point',
        action: (
          <div>
            <Link component={RouterLink} to={PATH_DASHBOARD.profileColection.add}>
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
      <ReduxDataTable
        reduxApi={getListProfileCollectionPoint}
        fetchedData={fetchedData}
        isLoading={loading}
        columns={TABLE_HEAD as any}
        selectable={true}
        shouldPaginate={true}
        // filters={TABLE_FILTERS}
      />
    </PageLayout>
  );
}
