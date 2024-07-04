import React, { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './App.css';

/* It manages the state of tasks
  and handles the addition, deletion, editing, and completion of tasks.
 It also persists tasks to local storage, ensuring they are saved between page reloads.*/

const App = () => {
  const [tasks, setTasks] = useState([]);//State hook to manage the list of tasks

  /*useEffect hook to load tasks from local storage when the component mounts.
    This ensures that tasks are persisted between page reloads.*/
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(tasks));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  },[]);

  //useEffect hook to save tasks to local storage whenever the tasks state changes.
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  //Function to add a new task to the list.
  const addTask = (taskText) => {
    setTasks([...tasks, { text: taskText, completed: false, isEditing: false }]);
  };

  // Function to delete a task from the list.
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  //Function to edit the text of an existing task
  const editTask = (index, newText) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: newText} : task
    );
    setTasks(newTasks);
  };

  //Function to start or stop editing a task. isEditing is a boolean value indicating whether the task is being edited.
  const startEditing = (index, isEditing) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, isEditing } : task
    );
    setTasks(newTasks);
  };

  //Function to toggle the completion status of a task.
  const toggleComplete = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} editTask={editTask} toggleComplete={toggleComplete} startEditing={startEditing}/>
    </div>
  );
};

export default App;

//setTasks() function is used for updating the state, after any type of update in the task or adding a new task. 
