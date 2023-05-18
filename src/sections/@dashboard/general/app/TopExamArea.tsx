// @mui
import { Card, CardHeader, CardProps, Stack, StackProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fShortenNumber } from '../../../../utils/formatNumber';
// components
import Image from '../../../../components/image';
import Scrollbar from '../../../../components/scrollbar';

// ----------------------------------------------------------------------

const StyledBlock = styled((props: StackProps) => (
  <Stack direction="row" alignItems="center" {...props} />
))({
  minWidth: 56,
});

// ----------------------------------------------------------------------

type ItemProps = {
  id: string;
  name: string;
  android: number;
  windows: number;
  apple: number;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  list: ItemProps[];
}

export default function TopExamArea({ title, subheader, list, ...other }: Props) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3 }}>
          {list.map((country) => (
            <CountryItem key={country.id} country={country} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

type CountryItemProps = {
  country: ItemProps;
};

function CountryItem({ country }: CountryItemProps) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
      <StyledBlock sx={{ minWidth: 120 }}>
        <Typography variant="subtitle2">{country.name}</Typography>
      </StyledBlock>

      <StyledBlock>
        <Image disabledEffect alt="profile" src='/assets/icons/apps/ic_profile.svg' sx={{ width: 18, height: 18 }} />
        <Typography variant="body2">{fShortenNumber(country.windows)}</Typography>
      </StyledBlock>
    </Stack>
  );
}
