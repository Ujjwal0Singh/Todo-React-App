import React from 'react';

const TaskList = ({ tasks, deleteTask, editTask, toggleComplete, startEditing}) => {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          <input 
            type="checkbox" 
            checked={task.completed} 
            onChange={() => toggleComplete(index)}
          />
          {task.isEditing ? (
            <input
              type="text"
              value={task.text}
              onChange={(e) => editTask(index, e.target.value)}
              onBlur={() => startEditing(index, false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') startEditing(index, false);
              }}
            />
          ) : (
            <span onDoubleClick={() => startEditing(index, true)}>{task.text}</span>
          )}
          <button onClick={() => deleteTask(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
