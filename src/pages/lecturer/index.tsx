// assets
import { Avatar, Button, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Actions from 'src/components/@orbit/Action';
import { FilterOptionType, TableFilterOptionProps } from 'src/components/@orbit/table';
import { ReduxDataTable } from 'src/components/@orbit/table/components/ReduxDataTable';
import Iconify from 'src/components/iconify';
import { FUNCTION_ROLE } from 'src/config-global';
import { ILecturer } from 'src/core/lecturer/domain';
import PageLayout from 'src/layouts/PageLayout';
import { deleteLecturer, GetLecturer, getListLecturer } from 'src/redux/slices/lecturer';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { fDate } from 'src/utils/formatTime';
import { useDispatch, useSelector } from '../../redux/store';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

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

const PageAction = () => {
  return (
    <Link component={RouterLink} to={PATH_DASHBOARD.lecturer.add}>
      <Button variant="outlined" startIcon={<Iconify icon={'eva:plus-fill'} />}>
        Add
      </Button>
    </Link>
  );
};

export default function Lecturer() {
  const { loading, dataList }: any = useSelector((state: any) => state.lecturer);

  const fetchedData = {
    data: dataList?.items || [],
    total: dataList?.totalItem || 0,
    totalPages: dataList?.totalPage || 0,
  };
  const dispatch = useDispatch();

  const HandleDelete = async (idx: any) => {
    try {
      const resp = await dispatch(deleteLecturer(idx));
      console.log(resp);
    } catch (error) {
      console.error(error);
    }

    return;
  };

  const HandleEdit = async (idx: any) => {
    const data = await dispatch(GetLecturer(idx));
    const oldData = data.payload.data;

    return oldData;
  };

  const handleDeleteMany = async (ids: string[]) => {
    console.log(ids);
  };

  const TABLE_HEAD = [
    {
      id: 'fullName',
      label: 'Full name',
      rowCell: {
        render: (datum: ILecturer) => (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={datum.thumbnail} src={datum.thumbnail} />
            <Typography variant="subtitle2">{datum.fullName}</Typography>
          </Stack>
        ),
      },
    },
    {
      id: 'identityCard',
      label: 'Identification number',
      rowCell: {
        render: (datum: ILecturer) => (
          <Typography variant="subtitle2" sx={{ width: 160 }} noWrap>
            {datum.identityCard}
          </Typography>
        ),
      },
    },
    {
      id: 'birthday',
      label: 'Date of birth',
      rowCell: {
        render: (datum: ILecturer) => <Typography noWrap>{fDate(datum.birthday)}</Typography>,
      },
    },
    {
      id: 'gender',
      label: 'Gender',
      rowCell: {
        render: (datum: ILecturer) => (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography>{datum.gender == '1' ? 'Men' : 'Women'}</Typography>
          </Stack>
        ),
      },
    },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone number' },
    {
      id: 'action',
      label: 'Action',
      rowCell: {
        render: (datum: ILecturer) => (
          <Actions
            idx={datum.id!}
            path={PATH_DASHBOARD.lecturer.root}
            OnEdit={HandleEdit}
            onDelete={HandleDelete}
          />
        ),
      },
    },
  ];

  return (
    <PageLayout
      title="Lecturer"
      roles={FUNCTION_ROLE.LECTURER}
      headerBreadCrumbsProps={{
        heading: 'Lecturer',
        action: <PageAction />,
      }}
    >
      <ReduxDataTable
        reduxApi={getListLecturer}
        fetchedData={fetchedData}
        isLoading={loading}
        columns={TABLE_HEAD as any}
        selectable={true}
        shouldPaginate={true}
        filters={TABLE_FILTERS}
        handleDeleteMany={handleDeleteMany}
      />
    </PageLayout>
  );
}
