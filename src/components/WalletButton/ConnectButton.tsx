import { keplrConfig } from "src/config/chains/config";
import { loadKeplrWallet } from "src/contexts/wallet/sdk";
import useNotifier from "src/hooks/useNotifier";
import { useSdk } from "src/contexts/wallet/wallet-context";
import { WalletIcon } from 'src/icons';
import { Button, ButtonProps } from "@mui/material";

export default function ConnectButton(props: ButtonProps) :JSX.Element{
    const sdk = useSdk()
    const {notifyError, notifySuccess} = useNotifier()
    const handleConnect = async () => {
        const signer = await loadKeplrWallet(keplrConfig)
        if (signer instanceof Error){
            notifyError(signer.message)
        }
        else{
            notifySuccess("Connect to Keplr wallet successfully!")
            sdk.init(signer)
            localStorage.setItem("clear", "false")
        }
    }
    return (<div>
        <Button variant="gradient" {...props} onClick={handleConnect} startIcon={<WalletIcon />}>
            Connect wallet
        </Button>
    </div>)
}