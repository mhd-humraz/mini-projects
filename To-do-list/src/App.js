import React, { useState } from 'react';
import ToDoList from './components/ToDoList';
import AddToDo from './components/AddToDo';
import './index.css';

function App() {
  const [todos, setTodos] = useState([]);

  const addToDo = text => {
    const newToDo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newToDo]);
  };

  const toggleComplete = id => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeToDo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <AddToDo addToDo={addToDo} />
      <ToDoList
        todos={todos}
        toggleComplete={toggleComplete}
        removeToDo={removeToDo}
      />
    </div>
  );
}

export default App;
