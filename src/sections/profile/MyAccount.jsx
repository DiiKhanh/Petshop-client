import { Button, styled } from "@mui/material";
import { Container, FormHelperText, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import CardHeader from "@mui/material/CardHeader";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Unstable_Grid2";
import Label from "~/components/label";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import userApi from "~/apis/modules/user.api";
import { toast } from "react-toastify";
import { CloudUpload, DeleteOutline } from "@mui/icons-material";
import axios from "axios";


const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1
});

const MyAccount = (props) => {
  const { value, index, ...other } = props;
  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [image, setImage] = useState(null);
  const {
    register,
    formState: { errors, touchedFields, isDirty },
    handleSubmit
  } = useForm();

  useEffect(() => {
    const getInfo = async () => {
      const { response, err } = await userApi.getInfo();
      if (response) {
        setUser(response);
      }
      if (err) {
        toast.error(err);
      }
    };
    getInfo();
  }, [index]);


  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Chỉ lấy tệp đầu tiên
    setImageUrl(file);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage([reader.result]); // Đặt trạng thái với mảng chứa một URL duy nhất
      }
    };
    reader.readAsDataURL(file);
  };


  const handleOnImageRemoveClick = () => {
    setImageUrl(null);
    setImage(null);
  };

  // cloudinary
  const uploadFiles = async (file) => {
    if (!file) return;
    const CLOUD_NAME = "du36crm0k";
    const PRESET_NAME = "petshop-upload";
    const FOLDER_NAME = "PetShop_AVT";
    const url = [];
    const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);
    formData.append("file", file);
    const response = await axios.post(api, formData, {
      headers:{
        "Content-Type":"multipart/form-data"
      }
    });
    if (response) {
      url.push(response.data.secure_url);
    }
    return url;
  };

  const handleUploadImg = async () => {
    const links = await uploadFiles(imageUrl);
    if (links.length === 0) {
      toast.error("Lỗi upload ảnh!");
      return null;
    }
    toast.success("Upload ảnh thành công!");
    return links;
  };

  const handleEdit = async (data) => {
    if (imageUrl) {
      const file = await handleUploadImg();
      let form;
      if (file && file.length > 0) {
        form = { ...data, id: user?.id, avatarUrl: file[0] };
      } else {
        form = { ...data, id: user?.id, avatarUrl: user?.avatarUrl || "" };
      }
      const { response, err } = await userApi.editInfo(form);
      if (response) {
        setUser(response);
        toast.success("Chỉnh sửa thành công!");
      }
      if (err) {
        toast.error("Có lỗi khi chỉnh sửa!!");
      }
    }
    else {
      const { response, err } = await userApi.editInfo({ ...data, id: user?.id, avatarUrl: user.avatarUrl || "" });
      if (response) {
        setUser(response);
        toast.success("Chỉnh sửa thành công!");
      }
      if (err) {
        toast.error("Có lỗi khi chỉnh sửa!!");
      }
    }
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          {
            user &&
          <form>
            <Grid container spacing={3}>
              <Grid lg={3} md={6} xs={12} mt={8}>
                <Card>
                  <CardContent>
                    <Stack spacing={2} sx={{ alignItems: "center" }}>
                      <div>
                        {
                          image ? <Avatar src={image} sx={{ height: "80px", width: "80px" }} />
                            : <Avatar src={user?.avatarUrl} sx={{ height: "80px", width: "80px" }} />
                        }
                      </div>
                      <Stack spacing={1} sx={{ textAlign: "center" }}>
                        <Typography variant="h5">{user?.username}</Typography>
                        <Typography color="text.secondary" variant="body2">
                        Trạng thái: <Label sx={{ ml: "5px" }} color={"success"}>{("Email Verified")}</Label>
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                        Account: <Label sx={{ ml: "5px" }} color={"success"}>{("Active")}</Label>
                        </Typography>
                        <Typography color="text.secondary" variant="body2">
                        Vai trò: <Label sx={{ ml: "5px" }} color={"success"}>{user?.role[0]}</Label>
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                  <Divider />
                  <CardActions>
                    {
                      image ? <Button variant="contained" startIcon={<DeleteOutline />}
                        fullWidth
                        onClick={handleOnImageRemoveClick}
                      >
                        Xóa hình ảnh
                      </Button> : <Button component="label" variant="contained" startIcon={<CloudUpload />}
                        fullWidth
                      >
                      Tải hình ảnh
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/png , image/jpeg, image/webp"
                          onChange={handleFileUpload}
                        />
                      </Button>
                    }

                  </CardActions>
                </Card>
              </Grid>
              <Grid lg={9} md={6} xs={12}>
                <Card>
                  <CardHeader subheader="The information can be edited" title="Profile" />
                  <Divider />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid md={6} xs={12}>
                        <FormControl fullWidth disabled>
                          <InputLabel>Username</InputLabel>
                          <OutlinedInput label="Username" name="username"
                            defaultValue={user?.username}
                          />
                          {
                            touchedFields && errors?.username?.message && <FormHelperText error>
                              {errors?.username?.message}
                            </FormHelperText>
                          }
                        </FormControl>
                      </Grid>
                      <Grid md={6} xs={12}>
                        <FormControl fullWidth required>
                          <InputLabel>Last name</InputLabel>
                          <OutlinedInput label="Last name" name="lastName" {
                            ...register("lastName")
                          }
                          defaultValue={user?.lastName}
                          />
                        </FormControl>
                      </Grid>
                      <Grid md={6} xs={12}>
                        <FormControl fullWidth required>
                          <InputLabel>First name</InputLabel>
                          <OutlinedInput label="First name" name="firstName" {
                            ...register("firstName")
                          }
                          defaultValue={user?.firstName}
                          />
                        </FormControl>
                      </Grid>
                      <Grid md={6} xs={12}>
                        <FormControl fullWidth disabled>
                          <InputLabel>Email address</InputLabel>
                          <OutlinedInput label="Email address" name="email"
                            defaultValue={user?.email}
                          />
                          {
                            touchedFields && errors?.email?.message && <FormHelperText error>
                              {errors?.email?.message}
                            </FormHelperText>
                          }
                        </FormControl>
                      </Grid>
                      <Grid md={6} xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Phone number</InputLabel>
                          <OutlinedInput label="Phone number" name="phoneNumber" type="tel" {
                            ...register("phoneNumber")
                          }
                          defaultValue={user?.phoneNumber}
                          />
                          {
                            touchedFields && errors?.phoneNumber?.message && <FormHelperText error>
                              {errors?.phoneNumber?.message}
                            </FormHelperText>
                          }
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button disabled={!isDirty} variant="contained"
                      onClick={handleSubmit(handleEdit)}
                    >Cập nhật</Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </form>
          }
        </Stack>

      </Container>
    </div>
  );
};

export default MyAccount;