import { DialogTitle, DialogTitleProps, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface BootstrapDialogTitleProps extends DialogTitleProps {
  onClose?: (_ev: React.SyntheticEvent) => void;
}

export default function BootstrapDialogTitle(props: BootstrapDialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'secondary.main',
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
