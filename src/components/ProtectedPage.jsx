// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import { useNavigate } from "react-router-dom";

// const ProtectedPage = ({ children }) => {
//   // const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.user);
//   // useEffect(() => {
//   //   // check if dont have account can not access private
//   //   // dispatch(setAuthModalOpen(!user));
//   //   if (!user) navigate("login");
//   // }, [user, navigate]);
//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//     }
//   }, [user, navigate]);

//   const hanleLogin = () => {
//     navigate("login");
//   };

//   return (
//     user ? children : <Box position="absolute" top="50%" left="50%"
//       sx={{ transform:"translate(-50%,-50%)" }}
//     >
//       <Typography textTransform="uppercase" fontSize="32px" color="primary.price">Hãy đăng nhập <Typography onClick={hanleLogin}>Tại đây</Typography></Typography>
//     </Box>
//   );
// };

// export default ProtectedPage;


import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedPage = ({ children }) => {
  const { user } = useSelector(state => state.user);

  const location = useLocation();

  if (!user) {
    toast.error("Phải đăng nhập mới có thể truy cập!");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedPage;