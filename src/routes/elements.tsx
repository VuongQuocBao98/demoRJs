import { Suspense, lazy, ElementType } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));
export const VerifyCodePage = Loadable(lazy(() => import('../pages/auth/VerifyCodePage')));
export const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPasswordPage')));
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));

// DASHBOARD:
export const OverViewPage = Loadable(lazy(() => import('../pages/overview')));

export const LecturerPage = Loadable(lazy(() => import('../pages/lecturer')));
export const LecturerCreateNewPage = Loadable(lazy(() => import('../pages/lecturer/create')));
export const LecturerEditPage = Loadable(lazy(() => import('../pages/lecturer/edit')));

export const ResultsPage = Loadable(lazy(() => import('../pages/results')));
export const ResultsTablePage = Loadable(lazy(() => import('../pages/results/ResultTable')));
export const ResultsCreateNewPage = Loadable(lazy(() => import('../pages/results/create')));
export const ResultsEditPage = Loadable(lazy(() => import('../pages/results/edit')));

export const ExamPage = Loadable(lazy(() => import('../pages/exam')));
export const ExamCreateNewPage = Loadable(lazy(() => import('../pages/exam/create')));
export const ExamEditPage = Loadable(lazy(() => import('../pages/exam/edit')));

export const ApplicationPage = Loadable(lazy(() => import('../pages/application')));
export const ApplicationCreateNewPage = Loadable(lazy(() => import('../pages/application/create')));
export const ApplicationEditPage = Loadable(lazy(() => import('../pages/application/edit')));

export const ExamRoomPage = Loadable(lazy(() => import('../pages/exam-room')));
export const ExamRoomCreateNewPage = Loadable(lazy(() => import('../pages/exam-room/create')));
export const ExamRoomEditPage = Loadable(lazy(() => import('../pages/exam-room/edit')));

export const SchedulePage = Loadable(lazy(() => import('../pages/schedule')));
export const ScheduleCreateNewPage = Loadable(lazy(() => import('../pages/schedule/create')));
export const ScheduleEditPage = Loadable(lazy(() => import('../pages/schedule/edit')));

export const CandidatePage = Loadable(lazy(() => import('../pages/candidate')));
export const CandidateTablePage = Loadable(lazy(() => import('../pages/candidate/CandidateTable')));
export const CandidateAddNew = Loadable(lazy(() => import('../pages/candidate/addNew')));
export const CandidateEdit = Loadable(lazy(() => import('../pages/candidate/edit')));

export const ProfileColection = Loadable(lazy(() => import('../pages/profileColection')));
export const ProfileColectionAddNew = Loadable(
  lazy(() => import('../pages/profileColection/addNew'))
);

export const CandidatePaperPage = Loadable(lazy(() => import('../pages/candidate-paper')));
export const CandidatePaperTablePage = Loadable(
  lazy(() => import('../pages/candidate-paper/CandidatePaperTable'))
);
export const CandidatePaperCreateNewPage = Loadable(
  lazy(() => import('../pages/candidate-paper/create'))
);
export const CandidatePaperEditPage = Loadable(lazy(() => import('../pages/candidate-paper/edit')));

export const CertificatePage = Loadable(lazy(() => import('../pages/certificate')));
export const CertificateTablePage = Loadable(lazy(() => import('../pages/certificate/CertificateTable')));
export const CertificateCreateNewPage = Loadable(lazy(() => import('../pages/certificate/create')));
export const CertificateEditPage = Loadable(lazy(() => import('../pages/certificate/edit')));

// MAIN
export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
