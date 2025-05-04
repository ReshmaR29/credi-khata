import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCustomers } from '../../context/CustomerContext';
import { jsPDF } from 'jspdf';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { PrinterIcon, ArrowLeftIcon } from '@heroicons/react/solid';
import Button from '../ui/Button';
import LoanCard from './LoanCard';

export default function CustomerDetail() {
  const { id } = useParams();
  const { selectedCustomer, loading, error, fetchCustomerDetails } = useCustomers();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchCustomerDetails(id);
    }
  }, [id]);

  const handleGenerateStatement = (customer) => {
    // Implement PDF generation using jsPDF
    toast.info('Generating PDF statement...');
     // Creating a new PDF document
  const doc = new jsPDF();

  // Add content to the PDF (you can format it as needed)
  doc.setFontSize(12);
   // Add Customer Information
   doc.text('Customer Statement', 20, 20);
   doc.text(`Name: ${customer.name}`, 20, 30);
   doc.text(`Phone: ${customer.phone}`, 20, 40);
   doc.text(`Email: ${customer.email}`, 20, 50);
   doc.text(`Address: ${customer.address}`, 20, 60);
   doc.text(`Total Outstanding: ${customer.totalOutstanding}Rs`, 20, 70);
   doc.text(`Last Transaction Date: ${customer.lastTransactionDate}`, 20, 80);
 
   // Add Loan Information
   doc.text('Loans:', 20, 100);
   customer.loans.forEach((loan, index) => {
     const loanStartY = 110 + index * 30; // Calculate position for each loan
     doc.text(`Loan #${loan.id}: ${loan.item}`, 20, loanStartY);
     doc.text(`Amount: ${loan.amount} Rs`, 20, loanStartY + 10);
     doc.text(`Due Date: ${loan.dueDate}`, 20, loanStartY + 20);
     doc.text(`Remaining Balance: ${loan.remainingAmount}Rs`, 20, loanStartY + 30);
     
     // Add Repayment Details
     doc.text('Repayments:', 20, loanStartY + 40);
     loan.repayments.forEach((repayment, repaymentIndex) => {
       const repaymentY = loanStartY + 50 + repaymentIndex * 10;
       doc.text(`Repayment #${repaymentIndex + 1}: ${repayment.amount}Rs on ${repayment.date}`, 20, repaymentY);
     });
   });
 
   // Save the PDF
   doc.save(`${customer.name}_Statement.pdf`);
  };

  if (loading) return <div>Loading customer details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!selectedCustomer) return <div>Customer not found</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')}
              className="mr-2 p-1 rounded-full hover:bg-gray-100"
            >
              <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
            </button>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {selectedCustomer.name}
            </h3>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => handleGenerateStatement(selectedCustomer)}
              className="flex items-center"
            >
              <PrinterIcon className="h-4 w-4 mr-2" />
              Statement
            </Button>
            <Button onClick={() => navigate(`/customers/${id}/add-loan`)}>
              Add Loan
            </Button>
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Phone</h4>
              <p className="mt-1 text-sm text-gray-900">{selectedCustomer.phone}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Email</h4>
              <p className="mt-1 text-sm text-gray-900">{selectedCustomer.email || 'N/A'}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Address</h4>
              <p className="mt-1 text-sm text-gray-900">{selectedCustomer.address || 'N/A'}</p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-500">Total Outstanding</h4>
            <p className={`mt-1 text-2xl font-semibold ${selectedCustomer.totalOutstanding > 0 ? 'text-red-600' : 'text-green-600'}`}>
              ₹{selectedCustomer.totalOutstanding.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Loans</h3>
        {selectedCustomer.loans.length === 0 ? (
          <p className="text-sm text-gray-500">No loans recorded</p>
        ) : (
          <div className="space-y-4">
            {selectedCustomer.loans.map((loan) => (
              <LoanCard key={loan.id} loan={loan} customerId={selectedCustomer.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}