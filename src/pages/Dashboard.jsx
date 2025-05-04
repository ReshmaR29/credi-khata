import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCustomers } from '../context/CustomerContext';
import CustomerList from '../components/customers/CustomerList';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';

export default function Dashboard() {

  const { customers, loading, fetchCustomers } = useCustomers();

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Customers
        </h2>
        <Link to="/customers/new">
          <Button>Add Customer</Button>
        </Link>
      </div>

      {loading && customers.length === 0 ? (
        <Loader />
      ) : (
        <CustomerList />
      )}
    </div>
  );
}