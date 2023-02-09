import { Box, Typography } from "@mui/material"

export default function Heading3(props) {

  const { children, ...rest } = props;

  return (
    <Box sx={{ my: '0.6rem' }} {...rest} >
      <Typography variant="h3">
        {children}
      </Typography>
    </Box>
  )
}
