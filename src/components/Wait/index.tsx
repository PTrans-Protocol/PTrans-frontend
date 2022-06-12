import { Box } from "@mui/material";
import React from "react";
import { LogoIcon } from "src/icons";

export default function Wait(){
    return(
        <Box sx={{
            width: "100%",
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Box
            display="flex"
            alignItems="center"
            >
            <LogoIcon style={{
                width: 100,
                height: 100,
                marginRight: 5
            }}
            
            />
            <p style={{fontFamily: "'Orbitron', sans-serif", fontSize: "2rem"}}>
            
            Please Wait...
            </p>
            </Box>
            
        </Box>
    )
}