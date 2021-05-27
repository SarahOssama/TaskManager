/* eslint-disable no-alert */
// import React from 'react'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from './Components/Header';
import Tasks from './Components/Tasks';
import AddTask from './Components/AddTask';
import Footer from './Components/Footer';
import About from './Components/About';
// import ConfigContextProvider from './Components/Context/ConfigContext';
 import { ConfigContext } from './Components/Context/ConfigContext'


const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  //  const URL=ConfigContext.BURL;
  const URL='http://localhost:5001';

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch(`${URL}/tasks`);
    const data = await res.json();

    return data;
  };

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`${URL}/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  // Add Task
  const addTask = async (task) => {
    // res = response
    const res = await fetch(`${URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 100000) + 1;
    // console.log(id);

    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  };

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`${URL}/tasks/${id}`, {
      method: 'Delete',
    });

    // console.log('delete',id)
    setTasks(tasks.filter((task) => task.id !== id)); // filter the tasks to show only the tasks I want (delete unwanted task)
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`${URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();

    // console.log(id);
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, reminder: !data.reminder } : task)),
    );
  };

  return (
    <Router>
      <div className="container">
        {' '}
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
          // showadd is a prop
        />
        {/* Route to show tasks */}
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Tasks are available'
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
};
// class App extends React.Component{
//   render(){
//     return <h1>Hello from React</h1>
//   }
// }
export default App;
