import { useState, useEffect } from 'react';
import {
  Link,
  matchPath,
  useLocation,
  useNavigate
} from 'react-router-dom';

import { routes } from '../../routes';
import { AuthRepository, AuthSessionRepository } from '../../domain/account/auth.interface';
import { AuthorizeContext, useAuthorizeService } from '../../service/authorize';
import { UserRepository } from '../../domain/account/user.interface';
import { OAuthEnum } from '../../policy/auth';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';

export const BaseContainer = ({
  children,
  repositories
}: {
  children: React.ReactNode;
  repositories: {
    authSessionRepository: AuthSessionRepository,
    authRepository: AuthRepository,
    userRepository: UserRepository
  }
}): JSX.Element => {
  const {
    authSessionRepository,
    authRepository,
    userRepository
  } = repositories;

  return (
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
        alert("로그아웃 되었습니다.");
        window.location.reload();
      },
      async isAdmin() {
        const session = await authSessionRepository.find();
        const current = Math.floor(Date.now() / 1000);
        if (!!session && session.exp > current && session.status === "GRANT") return !!session.isAdmin;
        return false;
      },
    }}>
      <div className='w-screen h-screen'>
        <TopNavBarXl />
        <TopNavBarSm />
        {children}
      </div>
    </AuthorizeContext.Provider>
  );
}

export function TopNavBarXl(){
  const [screenWidth, setScreenWidth] = useState(0)
  useEffect(() => {
      setScreenWidth(window.screen.width);
  }, []);
  const matchesDesktopXl = useMediaQuery('(min-width: 450px)'); //matchesDesktopXl에 최소 너비 1100px 일 때 true 또는 false를 설정
  return (
    <div className={`flex justify-center ${matchesDesktopXl ? `` : 'hidden'} ` } style={{
      width: `${screenWidth}px`}} >
      <AppBar position={"static"} color={"inherit"} sx={{
        boxShadow: "none",
      }}>
        <div className='flex flex-row items-center justify-between py-4 mx-auto' style={{
      width: `${screenWidth*0.8}px`}}>
          <Link to={"/"} className='w-[60px] h-[60px]'>
            <img src="/logo-main.png" alt="logo"/>
          </Link>
          <MyTabs />
          <SubNavSeparator />
        </div>
      </AppBar>
    </div>
  );
}

export function TopNavBarSm() {
  const matchesDesktopSm = useMediaQuery('(max-width: 449px)');
  const [navHeight,] = useState<number>(30)
  const StyledToolbar = styled(Toolbar)`
  display: flex;
  align-items: center;
  height: 100%;
  `
  return (
    <div className={` ${matchesDesktopSm ? `` : "hidden"} flex`} style={{paddingBottom: `${navHeight+16}px`,}} >
      <AppBar  color={"inherit"} position={"fixed"} sx={{boxShadow: "none"
      }}>
        <StyledToolbar>
          <TemporaryDrawer />
          <Link to={"/"}>
            <img src="/logo-sm.png" alt="logo" height={`${navHeight}px`}/>
          </Link>
        </StyledToolbar>
      </AppBar>
    </div>
  );
}

export function TemporaryDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setIsOpen(open);
    };

  return (
    <div>
      <button onClick={toggleDrawer(true)}>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          sx={{ mr: 2, mt :1, 
            '& .MuiSvgIcon-root': {
              fontSize: '35px', // 아이콘의 크기를 조절합니다.
            },
            color: "primary.main"
          }}
        >
          <MenuIcon />
        </IconButton>
      </button>
      <Drawer
        anchor={"left"}
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        {
          <Box
            sx={{ width: 230 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <Link to={routes.subjectSearch.path}>
                <ListItem key="교과탐색" disablePadding>
                  <ListItemButton>
                    <ListItemText primary="교과탐색" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to={routes.subjectRecommend.path}>
                <ListItem key="성적별 교과탐색" disablePadding>
                  <ListItemButton>
                    <ListItemText primary="성적별 교과탐색" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link to={routes.people.path}>
                <ListItem key="도움을 주시는 분들" disablePadding>
                  <ListItemButton>
                    <ListItemText primary="도움을 주시는 분들" />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
            <Divider />
            <List>
              <div className='ml-5'><SubNavSeparator /></div>
            </List>
          </Box>
        }
      </Drawer>
    </div>
  );
}

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

function MyTabs() {
  // You need to provide the routes in descendant order.
  // This means that if you have nested routes like:
  // users, users/new, users/edit.
  // Then the order should be ['users/add', 'users/edit', 'users'].
  const navigate = useNavigate();
  const routeMatch = useRouteMatch([
    routes.subjectSearch.path,
    routes.my.path,
    routes.subjectRecommend.path,
    routes.people.path,
  ]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={currentTab}
      sx={{
        position: "relative",
        top: 16
      }}
      onChange={(event, newValue) => {
        if (newValue === routes.subjectSearch.path) {
          return navigate(newValue);
        }
        if (newValue === routes.my.path) {
          return navigate(newValue);
        }
        if (newValue === routes.subjectRecommend.path) {
          return navigate(newValue);
        }
        if (newValue === routes.people.path) {
          return navigate(newValue);
        }
      }}
    >
      <Tab value={routes.subjectSearch.path} label="교과탐색"
        sx={{
          fontSize: "1.25rem",
          color: "black",
        }}
      />
      <Tab value={routes.subjectRecommend.path} label="성적별 교과탐색"
        sx={{
          fontSize: "1.25rem",
          color: "black",
        }}
      />
      <Tab value={routes.people.path} label="도움을 주시는 분들"
        sx={{
          fontSize: "1.25rem",
          color: "black",
        }}
      />
    </Tabs>
  );
}

export function SubNavSeparator() {
  const authService = useAuthorizeService();
  const [login, setLogin] = useState<boolean | undefined>(undefined);
  const [admin, setAdmin] = useState<boolean | undefined>(undefined);
  const {pathname} = useLocation();

  useEffect(() => {
    authService.isLogined()
      .then((result) => setLogin(result));
    authService.isAdmin()
      .then((result) => setAdmin(result));
  }, [pathname, authService]);

  if (typeof login === "undefined") return <></>;
  return (
    <Stack spacing={2} sx={{
      position: "relative",
      top: 16
    }}>
      <Breadcrumbs separator="|" aria-label="breadcrumb">
        {
          login ? [
            <Link key={0} to={routes.my.path} className='text-base text-black'>
              <Button sx={{color: "GrayText"}}>
                마이페이지
              </Button>
            </Link>,
            <Button key={1} className='text-base font-bold text-black' onClick={() => authService.terminateSession()}
              sx={{color: "GrayText"}}
            >
              로그아웃
            </Button>,
            admin && <Link key={0} to={routes.adminHome.path} className='text-base text-black'>
              <Button sx={{color: "GrayText"}}>
                관리자
              </Button>
            </Link>
          ] : [
            <Link key={0} to={routes.login.path} className='text-base text-black'>
              로그인
            </Link>,
            <Link key={1} to={routes.signup.path} className='text-base text-black '>
              회원가입
            </Link>
          ]
        }
      </Breadcrumbs>
    </Stack>
  );
}
