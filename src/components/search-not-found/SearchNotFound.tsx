import { Paper, PaperProps, Typography } from '@mui/material';

// ----------------------------------------------------------------------

interface Props extends PaperProps {
  query?: string;
  desc?: string;
}

export default function SearchNotFound({ query, desc, sx, ...other }: Props) {
  return query ? (
    <Paper
      sx={{
        textAlign: 'center',
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h6" paragraph>
        Not found
      </Typography>

      <Typography variant="body2">
        No results found for &nbsp;
        <strong>&quot;{query}&quot;</strong>.
        <br /> Try checking for typos or using complete words.
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2" sx={sx}>
      {desc || `Please enter keywords`}
    </Typography>
  );
}
