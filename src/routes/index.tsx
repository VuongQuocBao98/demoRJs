import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import { PATH_DASHBOARD } from 'src/routes/paths';
import {
  LoginPage,
  NewPasswordPage,
  Page403,
  Page404,
  //
  Page500,
  RegisterPage,
  ResetPasswordPage,
  VerifyCodePage,
  //dashboard
  OverViewPage,
  LecturerPage,
  LecturerCreateNewPage,
  LecturerEditPage,
  ResultsPage,
  ResultsCreateNewPage,
  ResultsEditPage,
  ResultsTablePage,
  ExamPage,
  ExamCreateNewPage,
  ExamEditPage,
  CandidateAddNew,
  CandidatePage,
  CandidateTablePage,
  ProfileColection,
  ProfileColectionAddNew,
  ExamRoomPage,
  ExamRoomCreateNewPage,
  CandidatePaperPage,
  CandidatePaperCreateNewPage,
  CandidatePaperEditPage,
  CandidatePaperTablePage,
  CertificatePage,
  CertificateCreateNewPage,
  CertificateEditPage,
  CertificateTablePage,
} from './elements';

// ----------------------------------------------------------------------

// const DynamicExamBreadcrumb = ({ match }: any) => {
//   return <span>{match.params.questionId}</span>;
// };

const ROUTES_AUTH = {
  path: 'auth',
  children: [
    {
      path: 'login',
      element: (
        <GuestGuard>
          <LoginPage />
        </GuestGuard>
      ),
    },
    {
      path: 'register',
      element: (
        <GuestGuard>
          <RegisterPage />
        </GuestGuard>
      ),
    },
    { path: 'login-unprotected', element: <LoginPage /> },
    { path: 'register-unprotected', element: <RegisterPage /> },
    {
      element: <CompactLayout />,
      children: [
        { path: 'reset-password', element: <ResetPasswordPage /> },
        { path: 'new-password', element: <NewPasswordPage /> },
        { path: 'verify', element: <VerifyCodePage /> },
      ],
    },
  ],
};

export const routes = [
  //Auth
  { ...ROUTES_AUTH },
  // Dashboard
  {
    path: '',
    element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    ),
    breadcrumb: 'Dashboard',
    children: [
      { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
      {
        path: PATH_DASHBOARD.overview.root,
        children: [{ element: <OverViewPage />, index: true }],
        breadcrumb: 'Dashboard',
      },
      {
        path: PATH_DASHBOARD.lecturer.root,
        children: [
          { element: <LecturerPage />, index: true },
          { path: PATH_DASHBOARD.lecturer.add, element: <LecturerCreateNewPage /> },
          { path: PATH_DASHBOARD.lecturer.edit, element: <LecturerEditPage /> },
        ],
      },
      {
        path: PATH_DASHBOARD.results.root,
        children: [
          { element: <ResultsPage />, index: true },
          {
            path: PATH_DASHBOARD.results.table,
            element: <ResultsTablePage />,
            breadcrumb: 'Detail',
          },
          { path: PATH_DASHBOARD.results.add, element: <ResultsCreateNewPage /> },
          { path: PATH_DASHBOARD.results.edit, element: <ResultsEditPage /> },
        ],
      },
      {
        path: PATH_DASHBOARD.exam.root,
        children: [
          { element: <ExamPage />, index: true },
          { path: PATH_DASHBOARD.exam.add, element: <ExamCreateNewPage /> },
          {
            path: PATH_DASHBOARD.exam.addCode,
            element: <ExamCreateNewPage />,
            breadcrumb: 'Code',
          },
          {
            path: PATH_DASHBOARD.exam.addSkill,
            element: <ExamCreateNewPage />,
            breadcrumb: 'Skill',
          },
          {
            path: PATH_DASHBOARD.exam.addSection,
            element: <ExamCreateNewPage />,
            breadcrumb: 'Section',
          },
          {
            path: PATH_DASHBOARD.exam.addSectionQuestion,
            element: <ExamCreateNewPage />,
            breadcrumb: 'Question',
          },
          { path: PATH_DASHBOARD.exam.edit, element: <ExamEditPage /> },
        ],
      },
      {
        path: PATH_DASHBOARD.candidate.root,
        children: [
          { element: <CandidatePage />, index: true },
          {
            path: PATH_DASHBOARD.candidate.table,
            element: <CandidateTablePage />,
            breadcrumb: 'Details',
          },

          { path: PATH_DASHBOARD.candidate.add, element: <CandidateAddNew /> },
        ],
      },
      {
        path: PATH_DASHBOARD.profileColection.root,
        children: [
          { element: <ProfileColection />, index: true },
          { path: PATH_DASHBOARD.profileColection.add, element: <ProfileColectionAddNew /> },
        ],
      },
      // examroom
      {
        path: PATH_DASHBOARD.room.root,
        children: [
          { element: <ExamRoomPage />, index: true },
          { path: PATH_DASHBOARD.room.createNew, element: <ExamRoomCreateNewPage /> },
        ],
      },

      //candidate paper
      {
        path: PATH_DASHBOARD.candidatePaper.root,
        children: [
          { element: <CandidatePaperPage />, index: true },
          { path: PATH_DASHBOARD.candidatePaper.table, element: <CandidatePaperTablePage /> },
          { path: PATH_DASHBOARD.candidatePaper.add, element: <CandidatePaperCreateNewPage /> },
          { path: PATH_DASHBOARD.candidatePaper.edit, element: <CandidatePaperEditPage /> },
        ],
      },

      //certificate
      {
        path: PATH_DASHBOARD.certificates.root,
        children: [
          { element: <CertificatePage />, index: true },
          {
            path: PATH_DASHBOARD.certificates.table,
            element: <CertificateTablePage />,
            breadcrumb: 'Detail',
          },
          {
            path: PATH_DASHBOARD.certificates.add,
            element: <CertificateCreateNewPage />,
          },
          { path: PATH_DASHBOARD.certificates.edit, element: <CertificateEditPage /> },
        ],
      },
    ],
  },

  {
    element: <CompactLayout />,
    children: [
      { path: '500', element: <Page500 /> },
      { path: '404', element: <Page404 /> },
      { path: '403', element: <Page403 /> },
    ],
  },
  { path: '*', element: <Navigate to="/404" replace /> },
];

export default function Router() {
  return useRoutes(routes);
}
