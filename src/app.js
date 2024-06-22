document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transaction-form');
    const transactionsContainer = document.getElementById('transactions');
    const chartCtx = document.getElementById('chart').getContext('2d');
  
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();  // Prevent the default form submission
  
      const description = document.getElementById('description').value;
      const amount = parseFloat(document.getElementById('amount').value);
      const type = document.getElementById('type').value;
  
      const transaction = {
        description,
        amount,
        type,
        id: Date.now()
      };
  
      transactions.push(transaction);  // Add the new transaction to the array
      localStorage.setItem('transactions', JSON.stringify(transactions));  // Update local storage
  
      updateUI();  // Update the UI
      form.reset();  // Reset the form fields
    });
  
    function updateUI() {
      transactionsContainer.innerHTML = '';  // Clear the existing transactions
  
      transactions.forEach(transaction => {
        const transactionEl = document.createElement('div');
        transactionEl.innerHTML = "${transaction.description}: $${transaction.amount} (${transaction.type})";
        transactionsContainer.appendChild(transactionEl);  // Add each transaction to the UI
      });
  
      updateChart();  // Update the chart
    }
  
    function updateChart() {
      const income = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
      const expense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  
      new Chart(chartCtx, {
        type: 'pie',
        data: {
          labels: ['Income', 'Expense'],
          datasets: [{
            data: [income, expense],
            backgroundColor: ['green', 'red']
          }]
        }
      });
    }
  
    updateUI();  // Initial UI update when the page loads
  });