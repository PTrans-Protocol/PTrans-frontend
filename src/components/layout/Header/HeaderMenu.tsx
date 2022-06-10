import { Fragment, SyntheticEvent, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Popover, SvgIconProps, Typography } from '@mui/material';
import { WalletButton } from 'src/components/WalletButton';
import ToggleThemeButton from 'src/components/ToggleThemeButton';
import { AnchorElType } from 'src/global';
import { useAppContext } from 'src/contexts/app-context';

export default function HeaderMenu(props: SvgIconProps) {
  const { mode } = useAppContext();
  const [anchorEl, setAnchorEl] = useState<AnchorElType>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'header-menu-popover' : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = (ev: SyntheticEvent) => {
    setAnchorEl(ev.currentTarget);
  };

  return (
    <Fragment>
      <MenuIcon
        {...props}
        sx={{
          cursor: 'pointer',
          color: open ? 'text.primary' : 'text.secondary',
          ...props?.sx,
        }}
        aria-describedby={id}
        onClick={handleOpen}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        elevation={2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box pt={2.5} pb={2} px={2}>
          <Box>
            <WalletButton fullWidth />
          </Box>
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography>{mode === 'dark' ? 'Dark' : 'Light'} mode</Typography>
            <ToggleThemeButton />
          </Box>
        </Box>
      </Popover>
    </Fragment>
  );
}
