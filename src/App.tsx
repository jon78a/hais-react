import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes, adminRoutes } from './routes';

import Layout from './pages/Layout';
import OAuthPage from './pages/OAuth';
import SignupPage from './pages/Signup';
import HomePage from './pages/Home';
import SubjectSearchPage from './pages/SubjectSearch';
import LoginPage from './pages/Login';
import SubjectRecommendPage from './pages/SubjectRecommend';
import OAuthLogout from './pages/OAuthLogout';
import NotFound from './pages/NotFound';
import MyScorePage from './pages/MyScore';
// admin page
import { AdminLayout } from './pages/Layout';
import AdminSubjectPage from './pages/admin/Subject';
import AdminMajorPage from './pages/admin/Major';
import AdminMeasurementPage from './pages/admin/Measurement';
import MyPage from './pages/My';
import People from './pages/People';
import AdminSchoolPage from './pages/admin/School';
import AdminUniversityPage from './pages/admin/Univ';

function App() {
  return (
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
            <Route path={routes.myScore.path} element={<MyScorePage/>}/>
            <Route path={routes.my.path} element={<MyPage/>}/>
            <Route path={routes.people.path} element={<People/>}/>
          </Route>
          <Route path="/" element={<AdminLayout/>}>
            <Route path={adminRoutes.adminHome.path} element={<AdminSchoolPage/>} />
            <Route path={adminRoutes.adminSubject.path} element={<AdminSubjectPage/>} />
            <Route path={adminRoutes.adminSchool.path} element={<AdminSchoolPage/>} />
            <Route path={adminRoutes.adminUniversity.path} element={<AdminUniversityPage/>} />
            <Route path={adminRoutes.adminMajor.path} element={<AdminMajorPage/>} />
            <Route path={adminRoutes.adminMeasurement.path} element={<AdminMeasurementPage/>} />
          </Route>
          <Route path={"/*"} element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
