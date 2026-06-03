

import React, { useState } from 'react';
import BudgetForm from './components/BudgetForm';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import BudgetSummary from './components/BudgetSummary';
import ExpenseChart from './components/Charts/ExpenseChart';
import { useLocalStorage } from './hooks/useLocalStorage';
import './styles/App.css';

function App() {
  const [budget, setBudget] = useLocalStorage('budget', 0);
  const [expenses, setExpenses] = useLocalStorage('expenses', []);

  const handleSetBudget = (newBudget) => {
    setBudget(newBudget);
  };

  const handleAddExpense = (newExpense) => {
    setExpenses(prev => [newExpense, ...prev]);
  };

  const handleDeleteExpense = (expenseId) => {
    setExpenses(prev => prev.filter(expense => expense.id !== expenseId));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>💰 Budget Tracker</h1>
        <p>Take control of your finances and track your expenses</p>
      </header>

      <div className="app-content">
        <div className="left-column">
          <BudgetForm onBudgetSet={handleSetBudget} />
          <ExpenseForm onAddExpense={handleAddExpense} />
        </div>

        <div className="right-column">
          <BudgetSummary budget={budget} expenses={expenses} />
          <ExpenseList 
            expenses={expenses} 
            onDeleteExpense={handleDeleteExpense} 
          />
        </div>
      </div>

      <ExpenseChart expenses={expenses} />
    </div>
  );
}

export default App;
