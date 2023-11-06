import { useContext } from "react";
import ToDoContext from "../context/todolist";
import { Stack, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  todo: yup.string().required("Task cannot be empty!"),
});

export default function ToDoEdit({ task, onSubmit, onEditClick }) {
  const { editTaskById } = useContext(ToDoContext);

  const form = useForm({
    defaultValues: {
      todo: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const handleClick = (data) => {
    editTaskById(task.id, data.todo);
    onEditClick();
    reset();
  };

  return (
    <Stack width={400}>
      <form onSubmit={handleSubmit(handleClick)}>
        <Stack spacing={2} direction="row" justifyContent="space-between">
          <TextField
            fullWidth
            defaultValue={task.title}
            label="Task"
            size="small"
            {...register("todo")}
            id="todo"
            error={Boolean(errors.todo)}
            helperText={errors.todo ? errors.todo.message : ""}
          />
          <IconButton
            aria-label="add"
            variant="contained"
            color="primary"
            size="small"
            onClick={handleSubmit(handleClick)}
          >
            <AddIcon fontSize="medium" />
          </IconButton>
        </Stack>
      </form>
    </Stack>
  );
}
