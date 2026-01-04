import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import MapPage from './pages/MapPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPassword from './pages/ForgotPassword'; 
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <AuthProvider>
      {/* GLOBAL TOASTER SETTINGS */}
      <Toaster 
        position="top-center" 
        reverseOrder={false} 
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '10px',
            fontSize: '14px',
          },
          success: {
            style: { background: 'white', color: 'green', border: '1px solid #dcfce7' },
            iconTheme: { primary: 'green', secondary: 'white' }
          },
          error: {
            style: { background: 'white', color: 'red', border: '1px solid #fee2e2' },
            iconTheme: { primary: 'red', secondary: 'white' }
          }
        }}
      />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* <--- NEW ROUTE */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* PROTECTED ROUTES (Require Login) */}
        <Route 
          path="/map" 
          element={
            <ProtectedRoute>
              <MapPage />
            </ProtectedRoute>
          } 
        />
        
        {/* ADMIN ROUTE (Requires Login + Admin Role) */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } 
        />
        
        {/* CATCH ALL */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;