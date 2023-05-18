// routes
import { format } from 'date-fns';
import { identity } from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FUNCTION_ROLE } from 'src/config-global';
import PageLayout from 'src/layouts/PageLayout';
import { GetLecturer } from 'src/redux/slices/lecturer';
import { dispatch } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import LecturerNewForm from 'src/sections/@dashboard/lecturer/LecturerNewForm';
import mock from 'src/_mock/_mock';

// ----------------------------------------------------------------------



export default function LecturerEdit() {
  const { id } = useParams();
  const [currentdata, SetCurrentdata] = useState(null);

  const loadData = async () => {

    try {
      const currentLecturer = await dispatch(GetLecturer(id!));
      
      const data = currentLecturer.payload.data
      SetCurrentdata(data);
      return data;
    } catch (ex) {
      console.log(ex)
    }

    return null;
  }

  useEffect(() => {
    loadData();
  }, []);





  return (
    <PageLayout
      title="Lecturer"
      roles={FUNCTION_ROLE.LECTURER}
      headerBreadCrumbsProps={{
        heading: 'Edit Lecturer',

      }}
    >
      {currentdata ? <LecturerNewForm isEdit currentLecturer={currentdata} /> : ''}
    </PageLayout>
  );
}
