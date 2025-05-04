import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { CurrencyRupeeIcon, CalendarIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/solid';

export default function LoanCard({ loan, customerId }) {
  const navigate = useNavigate();
  const isOverdue = new Date(loan.dueDate) < new Date() && loan.remainingAmount > 0;
  const paidPercentage = ((loan.amount - loan.remainingAmount) / loan.amount) * 100;

  return (
    <div className={`border rounded-lg overflow-hidden ${isOverdue ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-white'}`}>
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h4 className="text-lg font-medium leading-6 text-gray-900">
            {loan.item}
          </h4>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <CurrencyRupeeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            <span>₹{loan.amount.toFixed(2)} (₹{loan.remainingAmount.toFixed(2)} remaining)</span>
          </div>
        </div>
        <div className="flex items-center">
          {isOverdue ? (
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          ) : (
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
          )}
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <h5 className="text-sm font-medium text-gray-500">Due Date</h5>
            <div className="mt-1 flex items-center text-sm text-gray-900">
              <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              <span>{format(new Date(loan.dueDate), 'PP')}</span>
            </div>
          </div>
          <div>
            <h5 className="text-sm font-medium text-gray-500">Status</h5>
            <p className="mt-1 text-sm text-gray-900">
              {isOverdue ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Overdue
                </span>
              ) : loan.remainingAmount > 0 ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Paid
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h5 className="text-sm font-medium text-gray-500">Progress</h5>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${isOverdue ? 'bg-red-600' : 'bg-blue-600'}`} 
              style={{ width: `${paidPercentage}%` }}
            ></div>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {paidPercentage.toFixed(0)}% paid (₹{loan.repayments.reduce((sum, r) => sum + r.amount, 0).toFixed(2)} of ₹{loan.amount.toFixed(2)})
          </p>
        </div>
        <div className="mt-5">
          <button
            type="button"
            onClick={() => navigate(`/customers/${customerId}/loans/${loan.id}/repayment`)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Record Repayment
          </button>
        </div>
      </div>
      {loan.repayments.length > 0 && (
        <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
          <h5 className="text-sm font-medium text-gray-500 mb-2">Repayment History</h5>
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-2 pl-4 pr-3 text-left text-xs font-medium text-gray-500 sm:pl-6">Date</th>
                  <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {loan.repayments.map((repayment, idx) => (
                  <tr key={idx}>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                      {format(new Date(repayment.date), 'PP')}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                      ₹{repayment.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}