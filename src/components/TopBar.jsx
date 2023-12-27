import React, { cloneElement, useState } from "react";
import { useScrollTrigger, useColorScheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import PetsIcon from "@mui/icons-material/Pets";
import SwitchMode from "./SwitchMode";
import Logo from "./Logo";
import Fade from "@mui/material/Fade";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import menuConfigs from "../configs/menu.config";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import Badge from "@mui/material/Badge";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Tooltip from "@mui/material/Tooltip";
import UserMenu from "./UserMenu";
import CartDrawer from "./CartDrawer";
import { usePathname } from "~/routes/hooks/usePathname.js";

const ScrollTopBar = ({ children, window }) => {
  const { mode } = useColorScheme();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined
  });

  return (
    cloneElement(children, {
      elevation: trigger ? 5 : 0,
      sx: {
        color: trigger ? "text.primary" : mode === "dark" ? "primary.contrastText" : "text.primary",
        backgroundColor: trigger ? "background.paper" : mode === "dark" ? "transparent" : "background.paper"
      }
    }
    )
  );
};

const ScrollTop = ({ children, window }) => {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 50
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16, zIndex:999 }}
      >
        {children}
      </Box>
    </Fade>
  );
};

const TopBar = () => {
  const { user } = useSelector(state => state.user);
  const { cartItems } = useSelector(state => state.cart);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const { mode } = useColorScheme();
  const navigate = useNavigate();
  // ----------

  const [state, setState] = useState({
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const pathname = usePathname();

  return (
    <React.Fragment>
      <Toolbar id="back-to-top-anchor" disableGutters={true}/>
      <ScrollTopBar>
        <AppBar sx={{ zIndex: 999 }}>
          <Container maxWidth="xl">
            <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
              {/* mobile */}
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton
                  color="inherit"
                  sx={{ mr: 2, display: { lg: "none" } }}
                  onClick={toggleSidebar}
                >
                  <MenuIcon/>
                </IconButton>
                <Box sx={{ display: { lg: "none" } }}>
                  <Logo/>
                </Box>
              </Stack>
              {/* mobile */}
              {/* pc */}
              <Box
                flexGrow={1} alignItems="center"
                sx={{
                  display: { xs:"none", lg: "flex" }
                }}>
                <Box sx={{ marginRight: "10px" }} display="flex" alignItems="center">
                  <PetsIcon/>
                  <Logo />
                </Box>
                {
                  menuConfigs.main.map((item, index) => (
                    <Button key={index}
                      component={Link}
                      to={item.path}
                      sx={{
                        color: item.path === pathname ? "primary.contrastText" : "inherit",
                        mr: 2,
                        transition: "all 0.2s ease",
                        " &:hover":{
                          background:(theme) => theme.palette.primary.main
                        }
                      }}
                      variant={item.path === pathname ? "contained" : "text"}
                    >
                      {item.display}
                    </Button>
                  ))
                }
                <SwitchMode />
              </Box>

              <Stack direction="row" spacing={1}>
                {
                  user && <Tooltip title="Giỏ hàng">
                    <IconButton aria-label="cart" onClick={toggleDrawer("right", true)}>
                      <Badge badgeContent={cartItems?.length} color="primary">
                        <AddShoppingCartIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                }

                {/* user menu */}
                <Stack spacing={3} direction='row' alignItems='center'>
                  {!user && <Button
                    variant='contained'
                    onClick={() => navigate("login")}
                  >
                    Đăng nhập
                  </Button>}
                </Stack>
                {
                  user && <UserMenu />
                }
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
      </ScrollTopBar>
      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top"
          sx={{
            bgcolor: mode === "dark" ? "primary.main" : "primary.main"
          }}
        >
          <KeyboardArrowUpIcon
            sx={{
              color:"#333"
            }}
          />
        </Fab>
      </ScrollTop>
      <CartDrawer toggleDrawer={toggleDrawer} state={state}/>
    </React.Fragment>
  );
};
export default TopBar;