import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import AdminPage from './AdminPage';
import AccountantPage from './AccountantPage';
import EmployeePage from './EmployeePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/accountant" element={<AccountantPage />} />
        <Route path="/employee" element={<EmployeePage />} />
      </Routes>
    </Router>
  );
}

export default App;
