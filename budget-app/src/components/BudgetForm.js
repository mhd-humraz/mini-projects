
import React, { useState } from 'react';
import '../styles/App.css';

const BudgetForm = ({ onBudgetSet }) => {
  const [budget, setBudget] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (budget && !isNaN(budget) && budget > 0) {
      onBudgetSet(parseFloat(budget));
      setBudget('');
    }
  };

  return (
    <div className="budget-form">
      <h2>Set Your Budget</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="budget">Monthly Budget ($)</label>
          <input
            type="number"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Enter your monthly budget"
            min="0"
            step="0.01"
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          Set Budget
        </button>
      </form>
    </div>
  );
};

export default BudgetForm;
