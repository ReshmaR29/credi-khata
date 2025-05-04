// Mock customer data
const customers = [
    {
      id: 1,
      name: 'Rahul Sharma',
      phone: '9876543210',
      email: 'rahul@example.com',
      address: '123, Main Street, Mumbai',
      totalOutstanding: 15000,
      lastTransactionDate: '2023-05-15',
      loans: [
        {
          id: 1,
          item: 'Refrigerator',
          amount: 25000,
          date: '2023-01-10',
          dueDate: '2023-06-10',
          remainingAmount: 15000,
          repayments: [
            { amount: 5000, date: '2023-03-15' },
            { amount: 5000, date: '2023-04-20' }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Neha Verma',
      phone: '9123456789',
      email: 'neha@example.com',
      address: '456, Park Avenue, Delhi',
      totalOutstanding: 0,
      lastTransactionDate: '2023-04-10',
      loans: [
        {
          id: 1,
          item: 'Washing Machine',
          amount: 30000,
          date: '2023-02-01',
          dueDate: '2023-07-01',
          remainingAmount: 0, // Loan fully paid
          repayments: [
            { amount: 10000, date: '2023-03-10' },
            { amount: 20000, date: '2023-04-10' }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Vikram Singh',
      phone: '9887654321',
      email: 'vikram@example.com',
      address: '789, Sunset Boulevard, Bangalore',
      totalOutstanding: 5000,
      lastTransactionDate: '2023-05-05',
      loans: [
        {
          id: 1,
          item: 'Air Conditioner',
          amount: 15000,
          date: '2023-03-15',
          dueDate: '2023-08-15',
          remainingAmount: 5000, // Pending balance
          repayments: [
            { amount: 5000, date: '2023-04-15' }
          ]
        }
      ]
    },
    {
      id: 4,
      name: 'Simran Kaur',
      phone: '9345678910',
      email: 'simran@example.com',
      address: '321, River Road, Kolkata',
      totalOutstanding: 25000,
      lastTransactionDate: '2023-04-25',
      loans: [
        {
          id: 1,
          item: 'Laptop',
          amount: 50000,
          date: '2023-01-25',
          dueDate: '2023-07-25',
          remainingAmount: 25000, // Pending balance
          repayments: [
            { amount: 10000, date: '2023-03-05' },
            { amount: 5000, date: '2023-04-10' }
          ]
        }
      ]
    },
    {
      id: 5,
      name: 'Amit Gupta',
      phone: '9234567890',
      email: 'amit@example.com',
      address: '654, Rose Garden, Chennai',
      totalOutstanding: 10000,
      lastTransactionDate: '2023-05-01',
      loans: [
        {
          id: 1,
          item: 'Television',
          amount: 20000,
          date: '2023-03-05',
          dueDate: '2023-08-05',
          remainingAmount: 10000, // Pending balance
          repayments: [
            { amount: 5000, date: '2023-04-15' }
          ]
        }
      ]
    },
    {
      id: 6,
      name: 'Sanjay Patel',
      phone: '9081726354',
      email: 'sanjay@example.com',
      address: '111, Greenfield Lane, Ahmedabad',
      totalOutstanding: 0, // Fully paid loan
      lastTransactionDate: '2023-04-30',
      loans: [
        {
          id: 1,
          item: 'Microwave',
          amount: 18000,
          date: '2023-02-25',
          dueDate: '2023-07-25',
          remainingAmount: 0, // Fully paid
          repayments: [
            { amount: 6000, date: '2023-03-20' },
            { amount: 12000, date: '2023-04-10' }
          ]
        }
      ]
    },
    {
      id: 7,
      name: 'Priya Mehta',
      phone: '9912345678',
      email: 'priya@example.com',
      address: '890, Oak Street, Pune',
      totalOutstanding: 18000,
      lastTransactionDate: '2023-05-02',
      loans: [
        {
          id: 1,
          item: 'Smartphone',
          amount: 30000,
          date: '2023-01-18',
          dueDate: '2023-06-18',
          remainingAmount: 18000, // Pending balance
          repayments: [
            { amount: 10000, date: '2023-03-25' }
          ]
        }
      ]
    },
    {
      id: 8,
      name: 'Ravi Joshi',
      phone: '9908765432',
      email: 'ravi@example.com',
      address: '222, Cloud Street, Jaipur',
      totalOutstanding: 0, // Loan fully paid
      lastTransactionDate: '2023-04-15',
      loans: [
        {
          id: 1,
          item: 'Laptop',
          amount: 40000,
          date: '2023-02-10',
          dueDate: '2023-07-10',
          remainingAmount: 0, // Fully paid
          repayments: [
            { amount: 15000, date: '2023-03-10' },
            { amount: 25000, date: '2023-04-10' }
          ]
        }
      ]
    }
  ];
  
  
  
  export const getCustomers = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(customers.map(c => ({
          id: c.id,
          name: c.name,
          phone: c.phone,
          totalOutstanding: c.totalOutstanding,
          lastTransactionDate: c.lastTransactionDate,
          loans: c.loans
        })));
      }, 500);
    });
  };
  
  export const getCustomerDetails = async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const customer = customers.find(c => c.id === parseInt(id));
        if (customer) {
          resolve(customer);
        } else {
          reject(new Error('Customer not found'));
        }
      }, 500);
    });
  };
  
  export const addCustomer = async (customerData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCustomer = {
          id: customers.length + 1,
          ...customerData,
          totalOutstanding: 0,
          lastTransactionDate: new Date().toISOString(),
          loans: []
        };
        customers.push(newCustomer);
        resolve(newCustomer);
      }, 500);
    });
  };
  
  export const addLoan = async (customerId, loanData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const customer = customers.find(c => c.id === parseInt(customerId));
        if (customer) {
          const newLoan = {
            id: customer.loans.length + 1,
            ...loanData,
            remainingAmount: loanData.amount,
            repayments: [],
            date: new Date().toISOString()
          };
          customer.loans.push(newLoan);
          customer.totalOutstanding += loanData.amount;
          customer.lastTransactionDate = new Date().toISOString();
          resolve(customer);
        }
      }, 500);
    });
  };
  
  export const addRepayment = async (customerId, loanId, repaymentData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const customer = customers.find(c => c.id === parseInt(customerId));
        if (customer) {
          const loan = customer.loans.find(l => l.id === parseInt(loanId));
          if (loan) {
            loan.repayments.push({
              amount: repaymentData.amount,
              date: new Date().toISOString()
            });
            loan.remainingAmount -= repaymentData.amount;
            customer.totalOutstanding -= repaymentData.amount;
            customer.lastTransactionDate = new Date().toISOString();
            resolve(customer);
          }
        }
      }, 500);
    });
  };