import { useEffect } from 'react';
// @mui
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
//redux
import { useSelector } from 'react-redux';
import { getOverview } from 'src/redux/slices/overview';
import { IOverviewState } from 'src/@types/overview';
// _mock_
import { _appInstalled } from '../../_mock/arrays';
// sections
import PageLayout from 'src/layouts/PageLayout';
import { AppWidgetSummary, Revenue, TopExamArea } from '../../sections/@dashboard/general/app';
import { FUNCTION_ROLE } from 'src/config-global';
import useResponsive from 'src/hooks/useResponsive';
import { useDispatch } from 'src/redux/store';

// ----------------------------------------------------------------------

const OverViewPage = () => {
  const mdUp = useResponsive('up', 'md');
  const { overview, isLoading } = useSelector(
    (state: { overview: IOverviewState }) => state.overview
  );
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(getOverview() as any);
  }, [dispatch]);

  return (
    <PageLayout
      title="Dashboard"
      roles={FUNCTION_ROLE.OVERVIEW}
      headerBreadCrumbsProps={{
        heading: 'Overview',
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <AppWidgetSummary
            title="Total Active Users"
            percent={3.3}
            total={66300}
            chart={{
              colors: ['#00AB55'],
              series: [18, 35, 22, 22, 31, 20, 22],
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <AppWidgetSummary
            title="Total Pass"
            percent={-12.2}
            total={43700}
            chart={{
              colors: ['#00B8D9'],
              series: [18, 35, 22, 22, 31, 20, 22],
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <AppWidgetSummary
            title="Total Fail"
            percent={31.1}
            total={92300}
            chart={{
              colors: ['#FFAB00'],
              series: [18, 35, 22, 22, 31, 20, 22],
            }}
          />
        </Grid>

        <Grid item xs={12} md={8} lg={8}>
          <Revenue
            title="Revenue"
            subheader="(+43%) than last year"
            chart={{
              colors: ['#00AB55'],
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
              series: [
                {
                  year: '2023',
                  data: [{ name: 'Asia', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] }],
                },
                {
                  year: '2020',
                  data: [{ name: 'Asia', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] }],
                },
              ],
            }}
          />
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <TopExamArea
            title="Top exam area"
            list={_appInstalled}
            sx={mdUp ? { height: 505 } : {}}
          />
        </Grid>
      </Grid>
    </PageLayout>
  );
};

export default OverViewPage;
