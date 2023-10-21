import { createContext, useState, useMemo, useContext, useEffect } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

import { adminRoutes, routes } from "../../../routes";
import { AuthorizeContext } from "../../../service/authorize";
import {
  AuthSessionRepository,
  AuthRepository
} from "../../../domain/account/auth.interface";
import { UserRepository } from "../../../domain/account/user.interface";
import { OAuthEnum } from '../../../policy/auth';

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
import Container from "@mui/material/Container";

const titleMap = {
  [adminRoutes.adminHome.path]: "교과과목",
  [adminRoutes.adminSubject.path]: "교과과목"
}

const BaseContainerContext = createContext<{
  sideBarOpenState: [boolean, (value: boolean) => void];
  pathname: string;
} | undefined>(undefined);

const SideNavBar = () => {
  const isPersistent = useMediaQuery('(min-width:600px');
  const { sideBarOpenState: openState } = useContext(BaseContainerContext)!;
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
          title={titleMap[routes.adminSubject.path]}
          href={routes.adminSubject.path}
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

  const { sideBarOpenState, pathname } = useContext(BaseContainerContext)!;
  
  const [open] = sideBarOpenState;
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
  children,
  repositories
}: {
  children: React.ReactNode,
  repositories: {
    authSessionRepository: AuthSessionRepository,
    authRepository: AuthRepository,
    userRepository: UserRepository
  }
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    authSessionRepository,
    authRepository,
    userRepository
  } = repositories;

  const sideBarOpenState = useState<boolean>(true);
  const [open, setOpen] = sideBarOpenState;

  const isAdminHomePath = useMemo(() => !!matchPath(
    routes.adminHome.path, pathname
  ), [pathname, matchPath]);
  
  useEffect(() => {
    if (isAdminHomePath) navigate(routes.adminSubject.path);
  }, [isAdminHomePath, navigate]);

  return (
    <BaseContainerContext.Provider value={{
      sideBarOpenState,
      pathname
    }}>
      <AuthorizeContext.Provider value={{
        async isLogined() {
          const session = await authSessionRepository.find();
          const current = Math.floor(Date.now() / 1000);
          if (!!session && session.exp > current && session.status === "GRANT") return true;
          return false;
        },
        async terminateSession() {
          const session = await authSessionRepository.find();
          if (session) {
            const user = await userRepository.findByUserId(session.userId);
            if (user?.authChoice && user.authChoice !== "NORMAL") {
              authRepository.oAuthLogout(OAuthEnum[user.authChoice]);
              return;
            }
            await authSessionRepository.clear();
          };
          navigate(routes.home.path, {replace: true});
          alert("로그아웃 되었습니다.");
        },
      }}>
        <div className="w-screen h-screen flex flex-row bg-gray-100">
          <SideNavBar/>
          <Box width={"100%"} sx={{
            overflow: "hidden"
          }}>
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
            <Container maxWidth="lg">
              <Box height="100vh">
                <Typography variant={"h4"} component={"h1"} sx={{
                  textDecoration: "underline",
                  color: "primary.main",
                  textAlign: "center",
                  mt: 5,
                  mb: 3
                }}>
                  {titleMap[pathname]}
                </Typography>
                {children}
              </Box>
            </Container>
          </Box>
        </div>
      </AuthorizeContext.Provider>
    </BaseContainerContext.Provider>
  );
}

export default AdminBaseContainer;
