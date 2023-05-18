// @mui
import { Box, Stack } from '@mui/material';
// components
import Scrollbar from '../../../../components/scrollbar';
import ExamForm from './ExamForm';
import Image from 'src/components/image';
import { useParams } from 'react-router-dom';
import { SKILL_OPTIONS } from '../constant';
//

export default function ExamList() {
  const { section, skill = '', questionId = '' } = useParams();
  const isShowForm = !!section && SKILL_OPTIONS.includes(skill?.split('--')[0]) && !!questionId;
  return (
    <>
      {isShowForm ? (
        <Stack sx={{ position: 'relative', height: `calc(100% - 80px)` }}>
          <Scrollbar sx={{ height: `calc(72vh - 80px)` }}>
            <ExamForm />
          </Scrollbar>
        </Stack>
      ) : (
        <Stack alignItems="center" justifyContent="center" sx={{ height: `calc(72vh - 80px)` }}>
          <Image
            disabledEffect
            alt="tree view"
            src="/assets/icons/components/ic_tree_view.png"
            sx={{ width: 200, height: 200 }}
          />
        </Stack>
      )}
    </>
  );
}
