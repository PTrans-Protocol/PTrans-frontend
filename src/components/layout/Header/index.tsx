import { Box, Typography } from '@mui/material';
import ToggleThemeButton from 'src/components/ToggleThemeButton';
import { WalletButton } from 'src/components/WalletButton';
import { LogoIcon } from 'src/icons';

export default function Header() {

  return (
    <Box
      component="header"
      id="header"
      sx={{
        height: 55,
        width: '100%',
        position: { xsm: 'fixed' },
        top: 0,
        left: 0,
        bgcolor: 'background.paper',
        px: 2,
        borderBottomWidth: 1,
        borderBottomColor: 'divider',
        borderBottomStyle: 'solid',
        zIndex: 1201,
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box component="nav" aria-label="global navigation" sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <LogoIcon style={{
              width: 30,
              height: 30
            }}/>

            <Typography variant='h4' sx={{
                ml: 1
            }}>
                N3T.rs
            </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ mr: { md: 1 } }}>
            <WalletButton />
          </Box>
          <Box>
            <ToggleThemeButton />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
