// routes
import PageLayout from 'src/layouts/PageLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';
import ApplicationNewForm from 'src/sections/@dashboard/application/ApplicationNewForm';

// ----------------------------------------------------------------------

export default function ApplicationCreateNew() {

  return (
    <PageLayout
      title="Application"
      headerBreadCrumbsProps={{
        heading: 'Create New Application',
        links: [
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          {
            name: 'Application',
            href: PATH_DASHBOARD.application.root,
          },
          {
            name: 'Create New Application',
            href: PATH_DASHBOARD.application.createNew,
          },
        ],
      }}
    >
      <ApplicationNewForm />
    </PageLayout>
  );
}
