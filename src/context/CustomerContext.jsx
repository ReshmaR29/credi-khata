import { createContext, useContext, useState, useEffect } from 'react';
import { getCustomers, getCustomerDetails, addCustomer, addLoan, addRepayment } from '../services/customers';

const CustomerContext = createContext();

export function CustomerProvider({ children }) {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch customers from localStorage or API
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      let data = JSON.parse(localStorage.getItem('customers'));
     
      if (!data) {
        // If no customers in localStorage, fetch from API
        data = await getCustomers();
        localStorage.setItem('customers', JSON.stringify(data));
      }
      setCustomers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomerDetails = async (customerId) => {
    setLoading(true);
    try {
      const data = await getCustomerDetails(customerId);
      setSelectedCustomer(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create a new customer and update localStorage
  const createCustomer = async (customerData) => {
    try {
      const newCustomer = await addCustomer(customerData);
      setCustomers((prev) => {
        const updatedCustomers = [...prev, newCustomer];
        localStorage.setItem('customers', JSON.stringify(updatedCustomers));
        return updatedCustomers;
      });
      return newCustomer;
    } catch (err) {
      throw err;
    }
  };

  // Create a loan for a customer and update their details in localStorage
  const createLoan = async (customerId, loanData) => {
    try {
      const updatedCustomer = await addLoan(customerId, loanData);
      setSelectedCustomer(updatedCustomer);

      setCustomers((prevCustomers) => {
        const updatedCustomers = prevCustomers.map((customer) =>
          customer.id === customerId ? updatedCustomer : customer
        );
        localStorage.setItem('customers', JSON.stringify(updatedCustomers));
        return updatedCustomers;
      });

      return updatedCustomer;
    } catch (err) {
      throw err;
    }
  };

  // Create a repayment for a loan and update the customer data in localStorage
  const createRepayment = async (customerId, loanId, repaymentData) => {
    try {
      const updatedCustomer = await addRepayment(customerId, loanId, repaymentData);
      setSelectedCustomer(updatedCustomer);

      setCustomers((prevCustomers) => {
        const updatedCustomers = prevCustomers.map((customer) =>
          customer.id === customerId ? updatedCustomer : customer
        );
        localStorage.setItem('customers', JSON.stringify(updatedCustomers));
        return updatedCustomers;
      });

      return updatedCustomer;
    } catch (err) {
      throw err;
    }
  };

  const deleteCustomer = (id) => {
    try {
      const updatedCustomers = customers.filter(c => c.id !== id);
      setCustomers(updatedCustomers);
      localStorage.setItem('customers', JSON.stringify(updatedCustomers));
      return true;
    } catch (err) {
      console.error("Delete failed:", err);
      return false;
    }
  };

  return (
    <CustomerContext.Provider value={{
      customers,
      selectedCustomer,
      loading,
      error,
      fetchCustomers,
      fetchCustomerDetails,
      createCustomer,
      createLoan,
      createRepayment,
      deleteCustomer
    }}>
      {children}
    </CustomerContext.Provider>
  );
}

export const useCustomers = () => useContext(CustomerContext);
