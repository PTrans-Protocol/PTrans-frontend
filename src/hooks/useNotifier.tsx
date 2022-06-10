import { OptionsObject, useSnackbar } from 'notistack';

type SnackbarOptions = OptionsObject | undefined;

export const ERR_TOP_CENTER: SnackbarOptions = {
  variant: 'error',
  anchorOrigin: { vertical: 'top', horizontal: 'center' },
};

export const WARNING_TOP_CENTER: SnackbarOptions = {
  variant: 'warning',
  anchorOrigin: { vertical: 'top', horizontal: 'center' },
};

export const INFO_TOP_CENTER: SnackbarOptions = {
  variant: 'info',
  anchorOrigin: { vertical: 'top', horizontal: 'center' },
};

export const SUCCESS_TOP_CENTER: SnackbarOptions = {
  variant: 'success',
  anchorOrigin: { vertical: 'top', horizontal: 'center' },
};

export const SUCCESS_BOTTOM_CENTER: SnackbarOptions = {
  variant: 'success',
  anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
};

export const SUCCESS_BOTTOM_RIGHT: SnackbarOptions = {
  variant: 'success',
  anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
};

export default function useNotifier() {
  const { enqueueSnackbar } = useSnackbar();

  const notifyError = (msg: string) => {
    enqueueSnackbar(msg, ERR_TOP_CENTER);
  };

  const notifySuccess = (msg: string) => {
    enqueueSnackbar(msg, SUCCESS_TOP_CENTER);
  };

  const notifyInfo = (msg: string) => {
    enqueueSnackbar(msg, INFO_TOP_CENTER);
  };

  const notifyWarn = (msg: string) => {
    enqueueSnackbar(msg, WARNING_TOP_CENTER);
  };

  return {
    notifyError,
    notifyInfo,
    notifySuccess,
    notifyWarn,
  };
}
