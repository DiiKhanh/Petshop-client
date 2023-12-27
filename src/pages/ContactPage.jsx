import { Container } from "@mui/material";
import Helmet from "~/components/Helmet";
import ContactView from "~/sections/contact/ContactView";

const ContactPage = () => {
  return (
    <Helmet title="Contact Petshop">
      <Container maxWidth="xl" sx={{ mt: "2rem" }}>
        <ContactView />
      </Container>
    </Helmet>
  );
};

export default ContactPage;