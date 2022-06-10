import { ButtonProps } from "@mui/material";
import { Fragment } from "react";
import { useSdk } from "src/contexts/wallet/wallet-context";
import ConnectButton from "./ConnectButton";
import ConnectedButton from "./ConnectedButton";


export function WalletButton(props: ButtonProps) : JSX.Element{
    const {initialized, address} = useSdk()
    return <Fragment>
        {initialized===true && address.length > 0 ? <ConnectedButton {...props}/> : <ConnectButton {...props}/> }
    </Fragment>
} 