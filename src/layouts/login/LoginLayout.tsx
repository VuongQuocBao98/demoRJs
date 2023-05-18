// @mui
import { Box, Stack } from '@mui/material';
// components
import { Logo } from '../../components/logo';
import AtributeCard from 'src/components/@orbit/carousel/AtributeCard';
//
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout({ children, illustration, title }: Props) {
  return (
    <StyledRoot>
      <Stack
        direction="row"
        justifyContent="center"
        sx={{ maxWidth: 1440, width: '100%', margin: '0 auto' }}
      >
        <Box sx={{ width: '100%' }}>
          <Box
            component="img"
            src="/logo/logoLogin.svg"
            sx={{
              width: { xs: 165, md: 181 },
              height: { xs: 48, md: 53 },
              cursor: 'pointer',
              zIndex: 9,
              position: 'absolute',
              mt: { xs: 6, md: '35px', xl: 5 },
              ml: { xs: 2, md: 4, lg: '36px', xl: 0 },
            }}
          />
          <StyledContent>{children}</StyledContent>
        </Box>
      </Stack>

      <StyledSection>
        <StyledSectionBg />
      </StyledSection>
    </StyledRoot>
  );
}
