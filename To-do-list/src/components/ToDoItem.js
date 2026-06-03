import React from 'react';

const ToDoItem = ({ todo, toggleComplete, removeToDo }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => removeToDo(todo.id)}>Remove</button>
    </div>
  );
};

export default ToDoItem;
