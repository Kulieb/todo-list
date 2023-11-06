import { useContext, formState } from "react";
import ToDoContext from "../context/todolist";
import { Stack, IconButton, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required("Task cannot be empty!"),
});

export default function ToDoCreate() {
  const form = useForm({
    defaultValues: {
      title: "",
    },
    resolver: yupResolver(schema),
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const { createTask } = useContext(ToDoContext);
  // const { register, handleSubmit, reset } = useForm({
  // });
  // const { errors } = formState;

  const handleClick = (data) => {
    createTask(data.title);
    reset();
  };

  return (
    <Stack width={400} marginBottom={3}>
      <form onSubmit={handleSubmit(handleClick)}>
        <Stack spacing={2} direction="row" justifyContent="space-between">
          <TextField
            fullWidth
            name="title"
            label="Task"
            size="small"
            {...register("title")}
            id="title"
            error={Boolean(errors.title)}
            helperText={errors.title ? errors.title.message : ""}
          />
          <IconButton
            aria-label="add"
            variant="contained"
            color="primary"
            size="small"
            onClick={handleSubmit(handleClick)}
            required
          >
            <AddIcon fontSize="large" />
          </IconButton>
        </Stack>
      </form>
    </Stack>
  );
}
