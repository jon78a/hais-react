import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from './routes/path';

import OAuthPage from './pages/OAuth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home.path} element={<></>}/>
        <Route path={`${routes.oauth.path}/:slug`} element={<OAuthPage/>}/>
        <Route path={"/*"} element={<></>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
