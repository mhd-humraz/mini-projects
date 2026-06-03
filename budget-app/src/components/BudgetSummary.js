

import React from 'react';
import '../styles/App.css';

const BudgetSummary = ({ budget, expenses }) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = budget - totalExpenses;
  const percentageUsed = budget > 0 ? (totalExpenses / budget) * 100 : 0;

  const getProgressBarColor = (percentage) => {
    if (percentage < 50) return '#4CAF50';
    if (percentage < 80) return '#FF9800';
    return '#F44336';
  };

  return (
    <div className="budget-summary">
      <h2>Budget Summary</h2>
      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Budget</h3>
          <p className="amount budget">${budget.toFixed(2)}</p>
        </div>
        <div className="summary-card">
          <h3>Total Spent</h3>
          <p className="amount spent">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="summary-card">
          <h3>Remaining</h3>
          <p className={`amount ${remaining < 0 ? 'over-budget' : 'remaining'}`}>
            ${remaining.toFixed(2)}
          </p>
        </div>
      </div>

      {budget > 0 && (
        <div className="progress-section">
          <div className="progress-header">
            <span>Budget Usage</span>
            <span>{percentageUsed.toFixed(1)}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min(percentageUsed, 100)}%`,
                backgroundColor: getProgressBarColor(percentageUsed)
              }}
            ></div>
          </div>
        </div>
      )}

      {remaining < 0 && (
        <div className="warning-message">
          ⚠️ You have exceeded your budget by ${Math.abs(remaining).toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default BudgetSummary;
