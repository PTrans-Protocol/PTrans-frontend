import { Box } from "@mui/material";
import React from "react";

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
            <img
              src={"logo192.png"}
              alt="N3T.rs logo"
              width={50}
              style={{ marginRight: "5px" }}
              className="rot"
            />
            <p style={{fontFamily: "'Orbitron', sans-serif", fontSize: "2rem"}}>
            
            Please Wait...
            </p>
            </Box>
            
        </Box>
    )
}