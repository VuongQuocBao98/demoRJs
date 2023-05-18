// routes
import { format } from 'date-fns';
import { identity } from 'lodash';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FUNCTION_ROLE } from 'src/config-global';
import PageLayout from 'src/layouts/PageLayout';
import { GetLecturer } from 'src/redux/slices/lecturer';
import { dispatch } from 'src/redux/store';
import { PATH_DASHBOARD } from 'src/routes/paths';
import LecturerNewForm from 'src/sections/@dashboard/lecturer/LecturerNewForm';
import ProfileColectionAddNew from 'src/sections/@dashboard/profileColection/ProfileAddNewForm';


// ----------------------------------------------------------------------

export default function ProfileColeectionEdit() {
  const { id } = useParams();
 

 

  const currentdata= async () =>{
    
    console.log('abc',id)
   const currentLecturer= await dispatch(GetLecturer(id!));
   console.log('aaaaaa',currentLecturer.payload.data)
    const data = currentLecturer.payload.data
    return data;
  }

  

  


  return (
    <PageLayout
      title="Lecturer"
      roles={FUNCTION_ROLE.LECTURER}
      headerBreadCrumbsProps={{
        heading: 'Edit Lecturer',
        
      }}
    >
      <ProfileColectionAddNew isEdit currentProfileColectionPoint={currentdata} />
    </PageLayout>
  );
}
