import { useEffect } from 'react';
import { useCustomers } from '../../context/CustomerContext';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { ArrowRightIcon, TrashIcon } from '@heroicons/react/solid';



export default function CustomerList() {
  const { customers, loading, error, fetchCustomers, deleteCustomer} = useCustomers();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  if (loading) return <div>Loading customers...</div>;
  if (error) return <div>Error: {error}</div>;

  const calculateNextDueDate = (loans) => {
    const unpaidLoans = loans.filter(loan => loan.remainingAmount > 0);
    if (unpaidLoans.length === 0) return null;

    return unpaidLoans.reduce((earliest, loan) => {
      const loanDueDate = new Date(loan.dueDate);
      return !earliest || loanDueDate < earliest ? loanDueDate : earliest;
    }, null);
  };

  const calculateStatus = (loans) => {
    const now = new Date();
    return loans.some(
      loan => loan.remainingAmount > 0 && new Date(loan.dueDate) < now
    )
      ? 'Overdue'
      : 'Up-to-date';
  };

  const handleDelete = (e, customerId, customerName) => {
    e.stopPropagation(); // Prevent click from triggering navigation
    const confirmed = window.confirm(`Are you sure you want to delete ${customerName}?`);
    if (confirmed) {
      const success = deleteCustomer(customerId);
      if (success) {
        toast.success(`${customerName} deleted successfully`);
      } else {
        toast.error('Failed to delete customer');
      }
    }
  };
  

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Customers</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {customers.map((customer) => {
          const nextDueDate = calculateNextDueDate(customer.loans);
          const status = calculateStatus(customer.loans);

          return (
            <li key={customer.id}>
              <div
                className="px-4 py-4 sm:px-6 hover:bg-gray-50 cursor-pointer "
                onClick={() => navigate(`/customers/${customer.id}`)}
              > 
                <div className="flex items-center justify-between">
                  <div className="flex items-center min-w-0">
                    <p className="text-sm font-medium text-blue-600 truncate">
                      {customer.name}
                    </p>
                    <p className="ml-2 flex-shrink-0 text-xs text-gray-500">
                      {customer.phone}
                    </p>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <div
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          customer.totalOutstanding > 0
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                    >
                      ₹{customer.totalOutstanding.toFixed(2)}
                    </div>
                    <ArrowRightIcon className="ml-2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      Last transaction: {format(new Date(customer.lastTransactionDate), 'PP')}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 space-x-2">
                    {nextDueDate && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Next Due: {format(nextDueDate, 'PP')}
                      </span>
                    )}
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                        ${
                          status === 'Overdue'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                    >
                      {status}
                    </span>
                  </div>
                </div>
                <button
                onClick={(e) => handleDelete(e, customer.id, customer.name)}
                className="text-gray-500 hover:text-red-700 mt-1"
               title="Delete Customer"
                >
                    <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
