import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import TooltipInfo from "src/components/TooltipInfo";
import ConnectButton from "src/components/WalletButton/ConnectButton";
import { useSdk } from "src/contexts/wallet/wallet-context";
import { invalidBech32Address, validateAndExtractNote } from "src/utils/format";
import { withdraw } from "src/zk";

export default function Withdraw(){
    const {initialized, address} = useSdk()
    const [recipient, setRecipient] = useState<string | undefined>(undefined);
    const [noteInfo, setNoteInfo] = useState<any>(undefined)
    const [withdrawStep, setWithdrawStep] = useState<'invalid' | 'none' | 'processing' | 'done' | 'fail'>('invalid')
    const handleRecipientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(invalidBech32Address(event.target.value as string)){
            setRecipient(event.target.value as string)
            if(noteInfo) setWithdrawStep('none')
        }
        else {
            setRecipient(undefined)
            setWithdrawStep('invalid')
        }
        setWithdrawStep(noteInfo && recipient ? 'none' : 'invalid')
    }
    const handleChangeNote = (event: React.ChangeEvent<HTMLInputElement>) => {
        const res = validateAndExtractNote(event.target.value)
        if(!res){
            setNoteInfo(undefined);
            setWithdrawStep('invalid')
        }else{
            setNoteInfo(res)
            if(recipient) setWithdrawStep('none')
        }
    }
    
    return(
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
        }}
        >
            <Typography>
                Note{" "}<TooltipInfo title="Please enter your note you received after deposit was made"><></></TooltipInfo>
            </Typography>

            <TextField focused variant="outlined" fullWidth sx={{mt: 1, mb: 3}} placeholder="Please enter your note"
            error={!noteInfo}
            onChange={handleChangeNote}
            helperText={noteInfo ? undefined : "Invalid note"}
            />

            <Typography>
                Recipient
            </Typography>

            <TextField focused variant="outlined" fullWidth sx={{mt: 1, mb: 5}} placeholder="Please paste your address here"
            onChange={handleRecipientChange}
            error={!recipient}
            helperText={!recipient ? "Invalid recipient address" : undefined}
            />
            {initialized===true && address.length > 0 ? 
            <Button variant="gradient" fullWidth sx={{height: '50px', fontSize: '20px'}} 
            //disabled={withdrawStep !== 'none'}
            onClick={withdraw}
            >
                Withdraw
            </Button> :
            <ConnectButton fullWidth sx={{height: '50px'}}/>    
            }
        </Box>
    )
}