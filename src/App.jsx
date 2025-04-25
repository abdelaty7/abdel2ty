import React, { useEffect, useState } from 'react';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

  if (token === null) return null;

  return token ? children : <Navigate to="/admin" />;
};

const App = () => {
  return (
    <div className='bg-gray-50'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/admin' element={<LoginPage />} />
          <Route path='/admin/inbox' element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;