import { useContext } from "react";
import ToDoContext from "../context/todolist";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function ToDoFooter() {
  const { tasks } = useContext(ToDoContext);
  if (!tasks.length)
    return (
      <Typography sx={{ fontWeight: "bold", fontStyle: "italic" }} variant="h6">
        Start adding tasks to you list
      </Typography>
    );
  const numTasks = tasks.length;
  const numFinished = tasks.filter((task) => task.finished).length;
  const percentage = Math.round((numFinished / numTasks) * 100);

  return (
    <Typography sx={{ fontWeight: "bold", fontStyle: "italic" }} variant="h6">
      {percentage === 100 ? (
        <Link to="/stats"> "Well done on finishing all your tasks🚀"</Link>
      ) : (
        `You have ${numTasks} tasks on your list, and you already finished ${numFinished} `
      )}
    </Typography>
  );
}
