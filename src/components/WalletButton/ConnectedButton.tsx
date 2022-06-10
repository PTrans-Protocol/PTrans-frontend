import { Box, Button, ButtonProps, Dialog, DialogContent, Link, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { useSdk } from "src/contexts/wallet/wallet-context";
import { WalletIcon } from "src/icons";
import { formatAddress } from "src/utils/format";
import CopyButton from "../CopyButton";
import BootstrapDialogTitle from "../primitives/BootstrapDialogTitle";


export default function ConnectedButton(props: ButtonProps):JSX.Element{

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {address, clear} = useSdk()
    const disconnect = () => {
        clear()
    }
    return (
        <Fragment>
          <Button variant="gradient" {...props} onClick={() => setIsOpen(!isOpen)} startIcon={<WalletIcon />}>
            {formatAddress(address!)}
          </Button>
    
          <Dialog open={isOpen} PaperProps={{ elevation: 0, sx: { maxWidth: 500 } }} fullWidth>
            <BootstrapDialogTitle onClose={() => setIsOpen(false)}>Wallet connection</BootstrapDialogTitle>
    
            <DialogContent>
              <Typography variant="body3" color="text.secondary" gutterBottom>
                Connected with Keplr
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6">{formatAddress(address!, 10, 10)}</Typography>
                <CopyButton text={address!} />
              </Box>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button variant="outlined" color="error" onClick={() => disconnect()}>
                  Disconnect
                </Button>
              </Box>
            </DialogContent>
          </Dialog>
        </Fragment>
      );
}