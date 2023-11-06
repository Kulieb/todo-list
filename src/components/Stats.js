import { useContext } from "react";
import ToDoContext from "../context/todolist";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";

export default function Stats() {
  const { tasks } = useContext(ToDoContext);
  const { id } = useParams();

  const numTasks = tasks.length;
  const numFinished = tasks.filter((task) => task.finished).length;
  const percentage = Math.round((numFinished / numTasks) * 100);

  return (
    <Typography variant="h6">Finished percentage = {percentage}</Typography>
  );
}
