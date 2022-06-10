import { Button, ButtonProps, CircularProgress, CircularProgressProps } from '@mui/material';

export interface BootstrapButtonProps extends ButtonProps {
  loading?: boolean;
  loadingProps?: CircularProgressProps;
  iconOnly?: boolean;
}

export default function BootstrapButton(props: BootstrapButtonProps) {
  const { children, sx, loadingProps, loading, size, iconOnly, ...other } = props;

  const getButtonLoadingStyles = () => {
    if (!loading) return {};
    return {
      height: size === 'small' ? 25.23 : size === 'large' ? 37.58 : 32,
    };
  };

  return (
    <Button
      sx={{
        ...sx,
        ...getButtonLoadingStyles(),
        ...(iconOnly
          ? {
              '& .MuiButton-startIcon, & .MuiButton-startIcon': {
                margin: 0,
              },
            }
          : {}),
      }}
      size={size}
      {...other}
    >
      {loading ? <CircularProgress size={14} color="inherit" {...loadingProps} /> : !iconOnly && children}
    </Button>
  );
}
