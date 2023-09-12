import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { routes } from './routes/path';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.home.path} element={<></>}/>
        <Route path={"/*"} element={<></>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
