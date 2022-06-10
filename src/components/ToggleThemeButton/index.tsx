import { IconButton, IconButtonProps } from '@mui/material';
import { useAppContext } from 'src/contexts/app-context';
import { MoonIcon, SunIcon } from 'src/icons';

export default function ToggleThemeButton(props: IconButtonProps) {
  const { mode, toggleThemeMode } = useAppContext();

  return (
    <IconButton size="small" {...props} onClick={() => toggleThemeMode()}>
      {mode === 'dark' ? <SunIcon fontSize="large" /> : <MoonIcon fontSize="large" />}
    </IconButton>
  );
}
