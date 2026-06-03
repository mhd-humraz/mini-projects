

import React, { useState } from 'react';
import '../styles/App.css';

const ExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = [
    'Food & Dining',
    'Transportation',
    'Entertainment',
    'Utilities',
    'Shopping',
    'Healthcare',
    'Education',
    'Travel',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expense.title && expense.amount && expense.category) {
      onAddExpense({
        ...expense,
        amount: parseFloat(expense.amount),
        id: Date.now().toString()
      });
      setExpense({
        title: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0]
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="expense-form">
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Expense Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={expense.title}
            onChange={handleChange}
            placeholder="Enter expense title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount ($)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={expense.amount}
            onChange={handleChange}
            placeholder="0.00"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={expense.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={expense.date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
