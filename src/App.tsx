import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes, adminRoutes } from './routes';
import {useEffect, useState} from 'react';

import Layout from './pages/Layout';
import OAuthPage from './pages/OAuth';
import SignupPage from './pages/Signup';
import HomePage from './pages/Home';
import SubjectSearchPage from './pages/SubjectSearch';
import LoginPage from './pages/Login';
import SubjectRecommendPage from './pages/SubjectRecommend';
import OAuthLogout from './pages/OAuthLogout';
import NotFound from './pages/NotFound';
import MyPage from './pages/My';
// admin page
import { AdminLayout } from './pages/Layout';
import AdminSubjectPage from './pages/admin/Subject';

function App() {
  const [screenWidth, setScreenWidth] = useState(0)
  useEffect(() => {
      setScreenWidth(window.screen.availWidth);
  }, []);
  
  return (
    <div className={`w-[${screenWidth}px]`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path={routes.home.path} element={<HomePage/>}/>
            <Route path={routes.signup.path} element={<SignupPage/>}/>
            <Route path={`${routes.oauth.path}/:slug`} element={<OAuthPage/>}/>
            <Route path={routes.subjectSearch.path} element={<SubjectSearchPage/>}/>
            <Route path={routes.login.path} element={<LoginPage/>}/>
            <Route path={routes.subjectRecommend.path} element={<SubjectRecommendPage/>}/>
            <Route path={`/oauth/logout/:slug`} element={<OAuthLogout/>}/>
            <Route path={routes.my.path} element={<MyPage/>}/>
          </Route>
          <Route path="/" element={<AdminLayout/>}>
            <Route path={adminRoutes.adminHome.path} element={<AdminSubjectPage/>} />
            <Route path={adminRoutes.adminSubject.path} element={<AdminSubjectPage/>} />
          </Route>
          <Route path={"/*"} element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
