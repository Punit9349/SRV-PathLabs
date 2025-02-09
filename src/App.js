import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';

// Pages
import Home from './pages/Home';
import TestMenu from './pages/TestMenu';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Login from './pages/Adminlogin';
import Register from './pages/Register';
import Programs from './pages/Programs';

// Patient Components
import Reports from './components/patient/Reports';
import Appointments from './components/patient/Appointment';
import Locations from './components/patient/Locations';
import PaymentPage from './components/patient/PaymentPage';
import MyOrders from './components/patient/MyOrders';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header/>
        <div className="flex flex-1">
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/test-menu" element={<TestMenu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/Admin-Login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/special-programs" element={<Programs />} />

              {/* Patient Routes */}
              <Route path="/download-reports" element={<Reports />} />
              <Route path="/make-an-appointment" element={<Appointments />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/payments" element={<PaymentPage />} />
              <Route path="/my-orders" element={<MyOrders />} />

              {/* Admin Routes */}
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Routes>
          </div>
        </div>        
      </div>
    </Router>
  );
};

export default App;
