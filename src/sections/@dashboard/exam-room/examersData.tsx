
import { useEffect, useMemo } from 'react';


import { useDispatch, useSelector } from '../../../redux/store';
import { getListLecturer } from 'src/redux/slices/lecturer';



const ExamRoomLecturerData = async () => {

  const dispatch = useDispatch();

 

  useEffect(() => {
    dispatch(getListLecturer({}));
  }, [dispatch]);

  const dataListexamers = useSelector((state: any) => state.lecturer.dataList)

  console.log('examers',dataListexamers.items)
  const exmaerss = dataListexamers.items;
  console.log( 'xx',exmaerss);
  let arr=[]
  if (exmaerss) {
     arr= await exmaerss.map((exam?: any) => ({label: exam.fullName, value: exam.id}))
  }

  
  // exmaerss.forEach(function (exmae:any) {
  //   const arr=[exmae.fullName]
  //   console.log(arr); 

    
  console.log('zz',arr);
  

  return arr


};

export default ExamRoomLecturerData;



