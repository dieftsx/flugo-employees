import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import RegisterEmployeePage from './pages/RegisterEmployeePage';
import EmployeeListPage from './pages/EmployeeListPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Box, CircularProgress } from '@mui/material';
import EditEmployeePage from './pages/EditEmployeePage';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return currentUser ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/" 
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PrivateRoute>
                <RegisterEmployeePage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/employees" 
            element={
              <PrivateRoute>
                <EmployeeListPage />
              </PrivateRoute>
            } 
          />
          {/* Nova rota para edição */}
          <Route 
            path="/edit-employee/:id" 
            element={
              <PrivateRoute>
                <EditEmployeePage />
              </PrivateRoute>
            } 
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;