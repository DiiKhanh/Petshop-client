import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const HeaderContainer = ({ header, icon, children }) => {
  return (
    <Box sx={{
      marginTop: "5rem",
      marginX: "auto",
      paddingX: "24px",
      color: "text.primary"
    }}>
      <Stack spacing={4}>
        {header && (
          <Box sx={{
            position: "relative",
            paddingX: { xs: "20px", md: 0 },
            maxWidth: "1366px",
            marginX: "auto",
            width: "100%",
            "&::before": {
              content: "\"\"",
              position: "absolute",
              left: { xs: "20px", md: "0" },
              top: "100%",
              height: "5px",
              width: "120px",
              backgroundColor: "primary.main"
            }
          }}>
            <Box display='flex' alignItems='center' gap={1}>
              {icon }
              <Typography variant='h5' fontWeight='700' textTransform='capitalize'>
                {header}
              </Typography>
            </Box>
          </Box>
        )}
        {children}
      </Stack>
    </Box>
  );
};

export default HeaderContainer;