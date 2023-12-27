import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ListPet from "./ListPet";

const ProfilePetView = () => {

  const { user } = useSelector(state => state.user);

  return (
    <Stack gap={2}>
      <Typography textTransform="uppercase" fontWeight={800} fontSize="1.2remx">
      Hồ sơ thú cưng đã mua
      </Typography>
      <ListPet user={user}/>
    </Stack>
  );
};

export default ProfilePetView;