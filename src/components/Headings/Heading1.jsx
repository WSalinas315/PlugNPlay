import { Box, Typography } from "@mui/material"

export default function Heading1(props) {

  const { children, sx, ...rest } = props;

  return (
    <Box sx={{ my: '0.6rem', ...sx }} >
      <Typography variant="h1">
        {children}
      </Typography>
    </Box>
  )
}