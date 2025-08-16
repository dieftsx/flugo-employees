import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterEmployeePage from './pages/RegisterEmployeePage';
import EmployeeListPage from './pages/EmployeeListPage';
import DashboardPage from './pages/DashboardPage';
import GlobalStyles from './assets/styles/globalStyles';

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/register" element={<RegisterEmployeePage />} />
        <Route path="/employees" element={<EmployeeListPage />} />
      </Routes>
    </Router>
  );
}

export default App;