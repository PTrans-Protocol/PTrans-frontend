import React, { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import "./index.css";
import { LogoIcon } from "src/icons";

export default function DepositWithdraw() {
  const [tab, setTab] = useState<number>(0);
  const handleToggleTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="space-around"
      flexDirection="column"
      alignItems="center"
      boxSizing="border-box"
      minHeight="90vh"
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <LogoIcon
          className="rot"
          style={{
            width: 80,
            height: 80,
          }}
        />

        <Typography
          sx={{
            ml: 1,
            fontSize: "50px",
            fontFamily: "'Orbitron', sans-serif",
          }}
        >
          PTrans
        </Typography>
      </Box>
      
      <Box
        sx={{
          width: { md: "50%", sm: "80%", xs: "100%" },
          //maxWidth: '800px',
          borderRadius: "10px",
          boxSizing: "border-box",
          px: 3,
          py: 3,

          bgcolor: "background.paper",
          border: "2px solid #1C8CF3",
          boxShadow: "0px 10px 10px #1C8CF3",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tabs
            value={tab}
            onChange={handleToggleTab}
            sx={{
              mb: "1rem",
            }}
          >
            <Tab
              value={0}
              label="Deposit"
              style={{
                fontSize: "1.2rem",
              }}
            />
            <Tab
              value={1}
              label="Withdraw"
              style={{
                fontSize: "1.2rem",
                marginLeft: 20,
              }}
            />
          </Tabs>
        </Box>
        {tab === 0 ? <Deposit /> : <Withdraw />}
      </Box>
      {/* <Typography
        sx={{
          fontSize: { md: "25px", sm: "20px", xs: "15px" },
          fontFamily: "'Orbitron', sans-serif",
        }}
      >
        ORAICHAIN Hackathon 2022!
      </Typography> */}
      <div className="wordCarousel">
        <span style={{
            color: '#1C8CF3'
        }}>We offer</span>
        <div>
          <ul className="flip4">
            <li>Anonymous Tokens Transfer</li>
            <li>Anti Money Laundering using AI Oracle</li>
            <li>Private ICO</li>
            <li>Unlock the potentials of Oraichain</li>
          </ul>
        </div>
      </div>
    </Box>
  );
}
