import { Container } from "@mui/material";
import Helmet from "~/components/Helmet";
import ProfilePetView from "~/sections/pet-profile/ProfilePetView";

const ProfilePetPage = () => {
  return (
    <Helmet title="profile pet">
      <Container sx={{ marginY: "5rem" }}>
        <ProfilePetView />
      </Container>
    </Helmet>
  );
};

export default ProfilePetPage;