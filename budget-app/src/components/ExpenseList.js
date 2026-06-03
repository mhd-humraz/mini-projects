

import React from 'react';
import '../styles/App.css';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (expenses.length === 0) {
    return (
      <div className="expense-list">
        <h2>Expenses</h2>
        <p className="no-expenses">No expenses recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      <div className="expenses-container">
        {expenses.map(expense => (
          <div key={expense.id} className="expense-item">
            <div className="expense-info">
              <div className="expense-title">{expense.title}</div>
              <div className="expense-category">{expense.category}</div>
              <div className="expense-date">{formatDate(expense.date)}</div>
            </div>
            <div className="expense-actions">
              <div className="expense-amount">${expense.amount.toFixed(2)}</div>
              <button
                onClick={() => onDeleteExpense(expense.id)}
                className="btn-delete"
                aria-label={`Delete expense ${expense.title}`}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
