import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useCustomers } from '../../context/CustomerContext';
import { toast } from 'react-toastify';
import Button from '../ui/Button';

export default function AddLoanForm() {
  const { id: customerId } = useParams();
  const { createLoan } = useCustomers();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await createLoan(customerId, {
        item: data.item,
        amount: parseFloat(data.amount),
        dueDate: data.dueDate
      });
      toast.success('Loan added successfully!');
      navigate(`/customers/${customerId}`);
    } catch (error) {
      toast.error(error.message || 'Failed to add loan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Add New Loan</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-5 sm:p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="item" className="block text-sm font-medium text-gray-700">
              Item Description *
            </label>
            <input
              type="text"
              id="item"
              {...register('item', { required: 'Item description is required' })}
              className={`mt-1 block w-full border ${errors.item ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {errors.item && <p className="mt-1 text-sm text-red-600">{errors.item.message}</p>}
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Loan Amount (₹) *
            </label>
            <input
              type="number"
              id="amount"
              step="0.01"
              min="0"
              {...register('amount', { 
                required: 'Amount is required',
                min: {
                  value: 0.01,
                  message: 'Amount must be greater than 0'
                }
              })}
              className={`mt-1 block w-full border ${errors.amount ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date *
            </label>
            <input
              type="date"
              id="dueDate"
              {...register('dueDate', { 
                required: 'Due date is required',
                validate: value => {
                  const selectedDate = new Date(value);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return selectedDate >= today || 'Due date must be in the future';
                }
              })}
              className={`mt-1 block w-full border ${errors.dueDate ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {errors.dueDate && <p className="mt-1 text-sm text-red-600">{errors.dueDate.message}</p>}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/customers/${customerId}`)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Loan'}
          </Button>
        </div>
      </form>
    </div>
  );
}