// routes
import PageLayout from 'src/layouts/PageLayout';
import { PATH_DASHBOARD } from 'src/routes/paths';
import ScheduleNewForm from 'src/sections/@dashboard/schedule/ScheduleNewForm';

// ----------------------------------------------------------------------

export default function ScheduleCreateNew() {

  return (
    <PageLayout
      title="Schedule"
      headerBreadCrumbsProps={{
        heading: 'Create New Schedule',
        links: [
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          {
            name: 'Schedule',
            href: PATH_DASHBOARD.schedule.root,
          },
          {
            name: 'Create New Schedule',
            href: PATH_DASHBOARD.schedule.createNew,
          },
        ],
      }}
    >
      <ScheduleNewForm />
    </PageLayout>
  );
}
