import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CustomerProvider } from './context/CustomerContext';
import PrivateRoute from './components/auth/PrivateRoute';
import Login from './components/auth/Login';
import SignUp from './components/auth/Signup';
import Dashboard from './pages/Dashboard';
import CustomerDetail from './components/customers/CustomerDetail';
import AddCustomer from './components/customers/AddCustomerForm';
import AddLoan from './components/customers/AddLoanForm';
import AddRepayment from './components/customers/RepaymentForm';
import Navbar from './components/layout/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Router>
      <AuthProvider>
        <CustomerProvider>
          <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<SignUp />} />

  
  <Route element={<PrivateRoute />}>
    <Route path="/" element={<Dashboard />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/customers/new" element={<AddCustomer />} />
    <Route path="/customers/:id" element={<CustomerDetail />} />
    <Route path="/customers/:id/add-loan" element={<AddLoan />} />
    <Route path="/customers/:customerId/loans/:loanId/repayment" element={<AddRepayment />} />
  </Route>

  <Route path="*" element={<Navigate to="/" />} />
</Routes>
              </div>
            </main>
          </div>
          <ToastContainer position="bottom-right" autoClose={5000} />
        </CustomerProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;