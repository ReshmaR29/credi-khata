import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCustomers } from '../../context/CustomerContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '../ui/Button';
import {v4 as uuidv4} from 'uuid'

export default function AddCustomerForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createCustomer, customers } = useCustomers();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const newCustomer = {
        id: customers.length+1,
        ...data,
        totalOutstanding: 0,
        lastTransactionDate: null,
        loans: [],
      }
    try {
      await createCustomer(newCustomer);
      toast.success('Customer added successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Failed to add customer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Add New Customer</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Name is required' })}
              className={`mt-1 block w-full border ${errors.name ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone', { 
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Please enter a valid 10-digit phone number'
                }
              })}
              className={`mt-1 block w-full border ${errors.phone ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              {...register('email', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className={`mt-1 block w-full border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              rows={3}
              {...register('address')}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Customer'}
          </Button>
        </div>
      </form>
    </div>
  );
}