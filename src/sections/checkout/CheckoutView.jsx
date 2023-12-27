import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import ListOrder from "./ListOrder";

const steps = ["Danh sách sản phẩm", "Thông tin giao hàng", "Thông tin thanh toán"];

function getStepContent(step) {
  switch (step) {
  case 0:
    return <ListOrder />;
  case 1:
    return <AddressForm />;
  case 2:
    return <PaymentForm />;
  default:
    throw new Error("Có lỗi!");
  }
}

const CheckoutView = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { cartItems, shipInfo } = useSelector(state => state.cart);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>
      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Thanh toán
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Quay lại
                </Button>
              )}

              {activeStep < steps.length - 1 && (
                cartItems?.length === 0 ? <>
                  Chưa có sản phẩm
                </> : <Button onClick={handleNext} sx={{ mt: 3, ml: 1 }} variant="contained"
                  disabled={activeStep === 1 && !shipInfo}
                >
                  Tiếp tục
                </Button>
              )}
            </Box>
          </React.Fragment>
          {/* )} */}
        </Paper>
      </Container>
    </>
  );
};

export default CheckoutView;