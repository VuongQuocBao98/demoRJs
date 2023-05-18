// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { FUNCTION_ROLE } from 'src/config-global';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  overview: icon('ic_overview'),
  lecturer: icon('ic_lecturer'),
  results: icon('ic_results'),
  exam: icon('ic_exam'),
  candidate: icon('ic_candidate'),
  examRoom: icon('ic_exam-room'),
  profile: icon('ic_profile'),
  candidatePaper: icon('ic_candidate-paper'),
  certificate: icon('ic_certificate'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Statistic',
    items: [
      {
        title: 'overview',
        path: PATH_DASHBOARD.overview.root,
        icon: ICONS.overview,
        roles: FUNCTION_ROLE.OVERVIEW,
      },
    ],
  },
  {
    subheader: 'Profile Management',
    items: [
      {
        title: 'lecturer',
        path: PATH_DASHBOARD.lecturer.root,
        icon: ICONS.lecturer,
        roles: FUNCTION_ROLE.LECTURER,
      },
      {
        title: 'candidate',
        path: PATH_DASHBOARD.candidate.root,
        icon: ICONS.candidate,
        roles: FUNCTION_ROLE.CANDIDATE,
      },
      {
        title: 'Profile Collection Point',
        path: PATH_DASHBOARD.profileColection.root,
        icon: ICONS.profile,
        roles: FUNCTION_ROLE.PROFILE_COLLECTION,
      },
    ],
  },
  {
    subheader: 'Exam Management',
    items: [
      {
        title: 'exam',
        path: PATH_DASHBOARD.exam.root,
        icon: ICONS.exam,
        roles: FUNCTION_ROLE.EXAM,
      },
      {
        title: 'Exam Room',
        path: PATH_DASHBOARD.room.root,
        icon: ICONS.examRoom,
        roles: FUNCTION_ROLE.EXAM_ROOM,
      },
      {
        title: "candidates' paper",
        path: PATH_DASHBOARD.candidatePaper.root,
        icon: ICONS.candidatePaper,
        roles: FUNCTION_ROLE.CANDIDATE_PAPER,
      },
      {
        title: 'results',
        path: PATH_DASHBOARD.results.root,
        icon: ICONS.results,
        roles: FUNCTION_ROLE.RESULTS,
      },
      {
        title: 'certificates',
        path: PATH_DASHBOARD.certificates.root,
        icon: ICONS.certificate,
        roles: FUNCTION_ROLE.CERTIFICATE,
      },
    ],
  },
];
export default navConfig;
