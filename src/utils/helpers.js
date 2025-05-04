export function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  
  export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  }