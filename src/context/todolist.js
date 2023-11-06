import { createContext, useState } from "react";
import axios from "axios";

const ToDoContext = createContext();

function Provider({ children }) {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:3001/tasks");

    setTasks(response.data);
  };

  const createTask = async (title) => {
    const response = await axios.post("http://localhost:3001/tasks", {
      title,
      finished: false,
    });

    const updatedTasks = [...tasks, response.data];
    setTasks(updatedTasks);
  };

  const editTaskById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/tasks/${id}`, {
      title: newTitle,
    });

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, ...response.data };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const deleteTaskById = async (id) => {
    await axios.delete(`http://localhost:3001/tasks/${id}`);

    const updatedTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(updatedTasks);
  };

  function toggleTask(id) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, finished: !task.finished } : task
      )
    );
  }

  const valueToShare = {
    tasks,
    fetchTasks,
    createTask,
    editTaskById,
    deleteTaskById,
    toggleTask,
  };

  return (
    <ToDoContext.Provider value={valueToShare}>{children}</ToDoContext.Provider>
  );
}

export { Provider };
export default ToDoContext;
