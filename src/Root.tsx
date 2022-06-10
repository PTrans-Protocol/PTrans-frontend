import React from 'react';
import App from './App';
import { SdkProvider } from './contexts/wallet/wallet-context';
import { AppProvider } from './contexts/app-context'
import {config} from './config/chains/config'
import { SnackbarKey, SnackbarProvider } from 'notistack';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function Root() {
  const notistackRef = React.createRef<SnackbarProvider>();
  const onClickDismiss = (key: SnackbarKey) => () => {
    notistackRef?.current?.closeSnackbar(key);
  };
    return (
      <div>
        <SnackbarProvider
        maxSnack={3}
        ref={notistackRef}
        preventDuplicate
        action={(key) => (
          <IconButton size="small" color="inherit" onClick={onClickDismiss(key)}>
            <CloseIcon style={{ cursor: 'pointer' }} />
          </IconButton>
        )}
        >
          <SdkProvider config={config}>
            <AppProvider>
              <App/>
            </AppProvider>
          </SdkProvider>
        </SnackbarProvider>
      </div>
    );
  }
  
  export default Root;