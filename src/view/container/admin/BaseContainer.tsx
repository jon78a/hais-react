import { createContext, useState, useMemo, useContext, useEffect } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";

import { routes } from "../../../routes";

import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";

const Context = createContext<{
  openState: [boolean, (value: boolean) => void];
  pathname: string;
} | undefined>(undefined);

const SideNavBar = () => {
  const isPersistent = useMediaQuery('(min-width:600px');
  const { openState } = useContext(Context)!;
  const [open, setOpen] = openState;

  const drawerWidth = useMemo(() => open ? 240 : undefined, [open]);

  return (
    <Drawer sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant={isPersistent ? 'persistent' : 'temporary'}
      anchor="left"
      open={open}
      onClose={(e) => setOpen(false)}
    >
      <div className="flex justify-between px-3 py-4">
        <Box width={60}>
          <img src={process.env.PUBLIC_URL + "/logo-sm.png"}/>
        </Box>
        <IconButton onClick={() => setOpen(false)}>
          <ArrowBackIosTwoToneIcon sx={{fontSize: "16px"}}/>
        </IconButton>
      </div>
      <Divider />
      <Stack sx={{
        py: 1
      }}>
        <LinkItem
          icon={<MenuBookIcon />}
          title={"교과과목"}
          href={routes.adminSubject.namespace + routes.adminSubject.path}
        />
      </Stack>
    </Drawer>
  );
}

interface LinkItemProps {
  icon?: React.ReactNode;
  title?: string;
  href: string;
}

const LinkItem: React.FC<LinkItemProps> = (props) => {
  const navigate = useNavigate();

  const { openState, pathname } = useContext(Context)!;
  
  const [open] = openState;
  const isMatched = useMemo(() => !!matchPath(props.href, pathname), [pathname, matchPath]);

  return (
    <Button sx={{
        width: "100%",
        py: 2
      }}
      onClick={() => navigate(props.href)}
    >
      <Grid container direction={"row"}>
        <Grid item xs={2} sx={{color: "GrayText"}}>
          {props.icon}
        </Grid>
        <Grid item xs={2} />
        {
          open && (
            <Grid item xs={8}>
              <Typography variant={"subtitle1"} sx={{
                textAlign: "left",
                color: isMatched ? undefined : "MenuText",
                fontWeight: "bold"
              }}>{props.title}</Typography>
            </Grid>
         )
        }
      </Grid>
    </Button>
  )
}

const AdminBaseContainer = ({
  children
}: {children: React.ReactNode}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const openState = useState<boolean>(true);
  const [open, setOpen] = openState;

  const isAdminHomePath = useMemo(() => !!matchPath(
    routes.adminHome.namespace + routes.adminHome.path, pathname
  ), [pathname, matchPath]);

  useEffect(() => {
    if (isAdminHomePath) navigate(routes.adminSubject.namespace + routes.adminSubject.path);
  }, [isAdminHomePath, navigate]);

  return (
    <Context.Provider value={{
      openState,
      pathname
    }}>
      <div className="w-screen h-screen flex flex-row">
        <SideNavBar/>
        <Box width={"100%"}>
          <AppBar position={"static"} color={"inherit"} elevation={1}>
            <Toolbar>
              {
                !open && (
                  <>
                  <IconButton onClick={() => setOpen(!open)}>
                    <MenuIcon/>
                  </IconButton>
                  <Box width={60} sx={{
                    mx: "auto",
                  }}>
                    <img src={process.env.PUBLIC_URL + "/logo-sm.png"}/>
                  </Box>
                  </>
                )
              }
            </Toolbar>
          </AppBar>
          {children}
        </Box>
      </div>
    </Context.Provider>
  );
}

export default AdminBaseContainer;
