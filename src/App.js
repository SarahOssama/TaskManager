//import React from 'react'
import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import AddTask from "./Components/AddTask";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };
  //Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 100000) + 1;
    console.log(id);

    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "Delete",
    });

    // console.log('delete',id)
    setTasks(tasks.filter((task) => task.id !== id)); //filter the tasks to show only the tasks I want (delete unwanted task)
  };

  //Toggle Reminder
  const toggleReminder = (id) => {
    // console.log(id);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      {" "}
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
        // showadd is a prop
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No Tasks are available"
      )}
    </div>
  );
};
// class App extends React.Component{
//   render(){
//     return <h1>Hello from React</h1>
//   }
// }
export default App;
