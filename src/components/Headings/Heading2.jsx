import { Box, Typography } from "@mui/material"

export default function Heading2(props) {

  const { children, ...rest } = props;

  return (
    <Box sx={{ my: '0.6rem' }} {...rest} >
      <Typography variant="h2">
        {children}
      </Typography>
    </Box>
  )
}
