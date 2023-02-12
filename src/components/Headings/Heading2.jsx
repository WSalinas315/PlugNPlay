import { Box, Typography } from "@mui/material"

export default function Heading2(props) {

  const { children, sx, fontSx, className, ...rest } = props;

  return (
    <Box className={className} sx={{ my: '0.6rem', ...sx }} >
      <Typography variant="h2" sx={{ ...fontSx }}>
        {children}
      </Typography>
    </Box>
  )
}
