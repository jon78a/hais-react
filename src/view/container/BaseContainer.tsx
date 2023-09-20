import { useState } from 'react';
import {
  Link,
  matchPath,
  useLocation,
  useNavigate
} from 'react-router-dom';

import { routes } from '../../policy/routes';
import { AuthRepository } from '../../domain/account/auth.interface';
import { AuthorizeContext, useAuthorizeService } from '../../context/authorize';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabsList } from '@mui/base/TabsList';
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
    authRepository: AuthRepository
  }
}): JSX.Element => {
  const {authRepository} = repositories;
  return (
    <AuthorizeContext.Provider value={{
      isLogined() {
        return authRepository.isLogined();
      },
      terminateSession() {
        authRepository.logout();
      },
    }}>
      <TopNavBarXl />
      <TopNavBarSm />
      {children}
    </AuthorizeContext.Provider>
  );
}

export function TopNavBarXl(){
  const matchesDesktopXl = useMediaQuery('(min-width: 1100px)'); //matchesDesktopXl에 최소 너비 1100px 일 때 true 또는 false를 설정

  return (
    <div className={`flex justify-center ${matchesDesktopXl ? 'min-w-[1100px]' : 'hidden'} ` }>
      <AppBar position={"static"} color={"inherit"} sx={{
        boxShadow: "none",
        borderBottomWidth: "2px",
        borderColor: "primary.main",
        pb: 2
      }}>
        <div className='w-1/2 flex flex-row justify-between items-center py-4 mx-auto'>
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
  const matchesDesktopSm = useMediaQuery('(max-width: 1099px)');

  const StyledToolbar = styled(Toolbar)`
  display: flex;
  align-items: center;
  height: 100%;
  `

  return (
    <div className={`${matchesDesktopSm ? 'min-w-[1099px]' : 'hidden'}`}>
      <AppBar position="static" color={"inherit"}>
        <StyledToolbar>
          <TemporaryDrawer />
          <Link to={"/"}>
            <img src="/logo-sm.png" alt="logo"  className='m-4 h-[40px]'/>
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
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <Link to={"/subject"}>
                <ListItem key="교과탐색" disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="교과탐색" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <ListItem key="커뮤니티" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="커뮤니티" />
                </ListItemButton>
              </ListItem>
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
    routes.subject.path,
    routes.my.path
  ]);
  const currentTab = routeMatch?.pattern?.path;

  return (
    <Tabs value={currentTab}
      sx={{
        position: "relative",
        top: 16
      }}
      onChange={(event, newValue) => {
        if (newValue === routes.subject.path) {
          navigate(routes.subject.path); return;
        }
        if (newValue === routes.my.path) {
          navigate(routes.my.path); return;
        }
      }}
    >
      <Tab value={routes.subject.path} label="교과탐색"
        sx={{
          fontSize: "1.25rem",
          color: "black"
        }}
      />
    </Tabs>
  );
}

const StyledTab = styled(Tab)`
  font-family: 'IBM Plex Sans', sans-serif;
  color: #000;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;
  background-color: none;
  width: 100%;
  padding: 20px 12px;
  margin: 6px;
  margin-bottom: 0;
  border: none;
  display: flex;
  justify-content: center;
  &:hover {
    border-bottom: 2px solid primary.main;
    margin-bottom: -2px;
  }
  &:focus {
    color: #fff;
    outline-bottom: 2px solid primary.main;
  }
`;

const StyledTabsList = styled(TabsList)(
  ({ theme }) => `  
  min-width: 800px;
  background-color: #fff;
  margin-bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
  `,
);

export function SubNavSeparator() {
  const authService = useAuthorizeService();

  const breadcrumbs = authService.isLogined() ? [
    <Link key={0} to={routes.my.path} className='text-base text-black'>
      마이페이지
    </Link>,
    <Button key={1} className='text-base font-bold text-black' onClick={() => authService.terminateSession()}>
      로그아웃
    </Button>
  ] : [
    <Link key={0} to={routes.login.path} className='text-base text-black'>
      로그인
    </Link>,
    <Link key={1} to={routes.signup.path} className='text-base text-black '>
      회원가입
    </Link>
  ];

  return (
    <Stack spacing={2} sx={{
      position: "relative",
      top: 16
    }}>
      <Breadcrumbs separator="|" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
