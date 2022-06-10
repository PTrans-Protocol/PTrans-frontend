import { Box, Button, CircularProgress, Dialog, DialogContent, FormControl, MenuItem, Select, SelectChangeEvent, Slider, Step, StepButton, StepIconProps, StepLabel, Stepper, styled, Typography } from "@mui/material";
import { useState } from "react";
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import ConnectButton from "src/components/WalletButton/ConnectButton";
import { useSdk } from "src/contexts/wallet/wallet-context";
import TooltipInfo from "src/components/TooltipInfo";
import { deposit } from "src/zk";
import BootstrapDialogTitle from "src/components/primitives/BootstrapDialogTitle";
import { getTokenList } from "src/config/tokens";

const CustomStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 20,
    height: 20,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
    ...(ownerState.completed && {
      backgroundImage:
        'linear-gradient( 136deg, rgb(28, 140, 243) 0%, rgb(28, 140, 243) 50%, rgb(28, 140, 243) 100%)',
    }),
  }));
  
  function CustomStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;
  
    return (
      <CustomStepIconRoot ownerState={{ completed, active }} className={className}/>
    );
  }
const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.primary.main,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.primary.main,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
      borderTopWidth: 3,
      borderRadius: 1,
    },
  }));
export default function Deposit(){
    const tokenList = getTokenList()
    const [tokenIdx, setTokenIdx] = useState<number>(0);
    const handleChangeToken = (event: SelectChangeEvent) => {
        setTokenIdx(parseInt(event.target.value))
    }
    const [step, setStep] = useState<number>(0)
    
    const [depositStep, setDepositStep] = useState<'none'|'processing'|'done'|'fail'>('none');
    const handleDeposit = async() => {
      setDepositStep('processing')
      await deposit(tokenList[tokenIdx].name, tokenList[tokenIdx].amounts[step])
      setDepositStep('done')
    }
    const {initialized, address} = useSdk()
    return (
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
        }}
        >
            <Typography>
                Token
            </Typography>
            <FormControl fullWidth sx={{mt:1, mb: 3}}>
        <Select
          autoFocus
          value={tokenIdx + ""}
          onChange={handleChangeToken}
        >
          {
            tokenList.map((tokenConfig, index) => 
            <MenuItem value={index + ""} key={index}>{tokenConfig.name}</MenuItem>
            )
          }
        </Select>
      </FormControl>
            <Typography>
                Amount{" "}<TooltipInfo title="Each amount is a standalone cash instance with a separate anonimity set"><></></TooltipInfo>
            </Typography>
            <Box sx={{ width: '100%', mt: 2, mb: 5 }}>
            <Stepper 
            nonLinear activeStep={step} alternativeLabel connector={<CustomStepConnector/>}
            style={{
              display: "flex",
              justifyContent: "space-between"
            }}
            >
                {tokenList[tokenIdx].amounts.map((amount, index) => (
                <Step key={index} completed={step === index}>
                <StepButton color="inherit" onClick={() => setStep(index)}>
                    <StepLabel StepIconComponent={CustomStepIcon}>{amount + " " + tokenList[tokenIdx].name}</StepLabel>
                </StepButton>
            </Step>
             ))}
            </Stepper>
            </Box>

            {initialized===true && address.length > 0 ? 
            <Button variant="gradient" fullWidth sx={{height: '50px', fontSize: '20px'}} onClick={handleDeposit} disabled={depositStep !== 'none'}>
                {depositStep === 'none' ? 'Deposit' : 'Wait...'}
            </Button> :
            <ConnectButton fullWidth sx={{height: '50px'}}/>
            
            }
            <Dialog open={depositStep === 'done'} PaperProps={{ elevation: 0, sx: { maxWidth: 600 } }} fullWidth>
              <BootstrapDialogTitle onClose={() => setDepositStep('none')}>Deposit Successfully</BootstrapDialogTitle>

              <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="h6">Your note has been downloaded as a text file.</Typography>
                <Typography variant="h6" sx={{color: "red", mt: 2}}>Please keep your note secret and use it to withdraw money.</Typography>
              </Box>
              </DialogContent>
            </Dialog>    
        </Box>
    )
}