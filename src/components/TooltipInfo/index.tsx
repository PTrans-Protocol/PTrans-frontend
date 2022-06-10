import { Box, Tooltip, TooltipProps } from '@mui/material';


export default function TooltipInfo(props: TooltipProps) {
  return (
    <Tooltip {...props}>
      <Box sx={{ display: 'inline' , backgroundColor: 'primary.main', padding:"0px 8px", borderRadius: "5px"}}>
        <span style={{fontWeight: 800, color:"white", fontSize:"12px"}}>i</span>
      </Box>
    </Tooltip>
  );
}

