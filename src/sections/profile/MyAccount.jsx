import { Button, ButtonGroup, Input, List, ListItem, ListItemText } from "@mui/material";

const MyAccount = (props) => {
  const { value, index, user, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <List>
        <ListItem >
          <ListItemText primary="Username" sx={{
            flex:"0.2 !important"
          }} />
          <Input defaultValue={user?.username} disabled sx={{ width:"400px !important" }}/>
        </ListItem>
        <ListItem>
          <ListItemText primary="Email" sx={{
            flex:"0.2 !important"
          }} />
          <Input sx={{ width:"400px !important" }}
            defaultValue={user?.email}
          />
        </ListItem>
        <ListItem >
          <ListItemText primary="Số điện thoại" sx={{
            flex:"0.2 !important"
          }} />
          <Input sx={{ width:"400px !important" }}
            defaultValue={user?.phoneNumber}
          />
        </ListItem>
        <ListItem >
          <ListItemText primary="Họ" sx={{
            flex:"0.2 !important"
          }} />
          <Input sx={{ width:"400px !important" }}
            defaultValue={user?.firstName}
          />
        </ListItem>
        <ListItem >
          <ListItemText primary="Tên" sx={{
            flex:"0.2 !important"
          }} />
          <Input sx={{ width:"400px !important" }}
            defaultValue={user?.lastName}
          />
        </ListItem>
      </List>
      <ButtonGroup sx={{ marginTop: 4 }}>
        <Button variant="contained">Cập nhật</Button>
      </ButtonGroup>
    </div>
  );
};

export default MyAccount;