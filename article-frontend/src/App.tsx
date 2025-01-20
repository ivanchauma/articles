import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Provider } from 'react-redux';
import { store } from './store';
//import './App.css';
//
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import NavbarComponent from './components/NavbarComponent';
import FooterComponent from './components/FooterComponent';
import Articles from './components/Articles';

import { Container } from 'react-bootstrap';

import { Routes, Route } from 'react-router';


import { BrowserRouter } from 'react-router';

import { checkAuth } from './features/auth/authSlice';
import Preferences from './components/Preferences';

import { useSelector } from 'react-redux';
import { RootState } from './store';

import { Navigate } from 'react-router';

const App: React.FC = () => {
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  // Dispatch checkAuth on initial load to check if user is authenticated
  useEffect(() => {
    store.dispatch(checkAuth());
  }, []);

  return (
    <BrowserRouter>
      <Container className="px-3">
        <NavbarComponent />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/preferences" element={<Preferences />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} /> // Redirect unauthenticated users to login page
          )}
        </Routes>
      </Container>
      <FooterComponent />
    </BrowserRouter>
  )
}

export default App