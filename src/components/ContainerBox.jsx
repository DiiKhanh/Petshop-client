import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


const ContainerBox = ({ title, children }) => {
  return (
    <Container maxWidth="xl" sx={{
      marginBottom: "80px"
    }}>
      <Stack spacing={4}>
        {title && (
          <Box sx={{
            position: "relative",
            marginX: "auto",
            width: "100%",
            "&::before": {
              content: "''",
              position: "absolute",
              left: "32%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              height: "5px",
              width: "120px",
              backgroundColor: "primary.main",
              display: { xs: "none", md: "block" }
            },
            "&::after": {
              content: "''",
              position: "absolute",
              right: "32%",
              top: "50%",
              transform: "translate(50%,-50%)",
              height: "5px",
              width: "120px",
              backgroundColor: "primary.main",
              display: { xs: "none", md: "block" }
            }
          }}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Typography variant="h4" fontWeight="700" textTransform="uppercase">
                {title}
              </Typography>
            </Box>
          </Box>
        )}
        {children}
      </Stack>
    </Container>
  );
};

export default ContainerBox;