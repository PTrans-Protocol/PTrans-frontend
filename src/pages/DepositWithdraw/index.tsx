import React, {useState} from 'react'
import {Box ,Tabs, Tab, Typography} from '@mui/material'
import Deposit from './Deposit'
import Withdraw from './Withdraw';
import './index.css';

export default function DepositWithdraw(){
    const [tab, setTab] = useState<number>(0)
    const handleToggleTab = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue)
    } 
    return (
        <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        >
        <Box 
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        >
            <Box component="nav" aria-label="global navigation" sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 , my: 5}}>
            <img
              src={"logo192.png"}
              alt="N3T.rs logo"
              width={50}
              style={{ display: 'block' }}
              className="rot"
            />

            <Typography sx={{
                ml: 1,
                fontSize: "50px",
                fontFamily: "'Orbitron', sans-serif"
            }}>
                PTrans
            </Typography>
            </Box>
            <Box 
            sx={{
                width:{md: '50%', sm: '80%', xs: '100%'},
                maxWidth: '800px',
                borderRadius: '10px',
                boxSizing: 'border-box',
                mt: 3,
                px: 3,
                py: 3,
                bgcolor: 'background.paper',
                border: "2px solid #1C8CF3",
                boxShadow: "0px 10px 10px #1C8CF3"
            }}
            >
            <Box sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                mb: 2
            }}>
            <Tabs
                value={tab}
                onChange={handleToggleTab}
            >
                <Tab
                    value={0}
                    label="Deposit"
                    style={{
                        fontSize: '20px',
                        
                    }}
                />
                <Tab
                    value={1}
                    label="Withdraw"
                    style={{
                        fontSize: '20px',
                        marginLeft: 20
                    }}
                />
            </Tabs>
            </Box>
            {tab === 0 ? <Deposit/> : <Withdraw/>}
            </Box>
            <Typography sx={{mt: {md: 10, sm: 5, xs: 5}, fontSize: {md: "25px", sm: "20px", xs: "15px"}, fontFamily: "'Orbitron', sans-serif"}}>ORAICHAIN Hackathon 2022!</Typography>
        </Box>

        </Box>
    )
}