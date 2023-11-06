import { useContext } from "react";
import ToDoContext from "../context/todolist";
import ToDoShow from "./ToDoShow";
import { Stack } from "@mui/material";

export default function ToDoList() {
  const { tasks } = useContext(ToDoContext);

  const renderedTasks = tasks.map((task) => {
    return <ToDoShow key={task.id} task={task} />;
  });
  return <Stack spacing={2}> {renderedTasks}</Stack>;
}
