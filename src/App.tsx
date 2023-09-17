import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from './policy/routes';

import Layout from './pages/Layout';
import OAuthPage from './pages/OAuth';
import SignupPage from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path={routes.home.path} element={<></>}/>
          <Route path={routes.signup.path} element={<SignupPage/>}/>
          <Route path={`${routes.oauth.path}/:slug`} element={<OAuthPage/>}/>
        </Route>
        <Route path={"/*"} element={<></>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
