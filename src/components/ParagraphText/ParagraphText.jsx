
import { Box, Typography } from "@mui/material"

export default function ParagraphText(props) {

  const { children, newVariant, ...rest } = props

  return (
    <Box sx={{ my: '0.6rem' }} {...rest} >
      <Typography variant={newVariant ?? "p"}>
        {children}
      </Typography>
    </Box>
  )
}