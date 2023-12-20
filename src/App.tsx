// App.tsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import { AuthProvider } from './utils/AuthContext';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Analytics from './components/stats/Analytics';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Header />
        <Routes>
            <Route element={<LandingPage/>} path="/"/>
            <Route element={<Login/>} path="/login"/>
            <Route element={<Signup/>} path="/signup"/>
          <Route path="/dashboard/*" element={<PrivateRoutes />}>
            <Route index element={<Dashboard />} />
            <Route path="stats" element={<Analytics />} />
          </Route>
          {/* Add other routes as needed */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
