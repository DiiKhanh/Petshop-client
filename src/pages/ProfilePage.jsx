import Helmet from "~/components/Helmet";
import { Container } from "@mui/material";
import ProfileView from "~/sections/profile/ProfileView";

const ProfilePage = () => {

  return (
    <Helmet title="Profile">
      <Container sx={{ marginTop:"100px" }}>
        <ProfileView />
      </Container>
    </Helmet>
  );
};

export default ProfilePage;