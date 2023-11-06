import { useContext, useState } from "react";
import ToDoContext from "../context/todolist";
import {
  Stack,
  Box,
  Typography,
  IconButton,
  FormControlLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ToDoEdit from "./ToDoEdit";
import Checkbox from "@mui/material/Checkbox";

export default function ToDoShow({ task }) {
  const [finished, setFinished] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const { deleteTaskById, toggleTask } = useContext(ToDoContext);

  const handleDelete = () => {
    deleteTaskById(task.id);
  };

  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const handleSubmit = (id, newTitle) => {
    setShowEdit(false);
  };

  const handleChange = (task) => {
    console.log(task);
    setFinished(!finished);
    toggleTask(task.id);
  };

  return (
    <Stack>
      {showEdit ? (
        <ToDoEdit
          task={task}
          onSubmit={handleSubmit}
          onEditClick={handleEditClick}
        />
      ) : (
        <Stack width={400}>
          <Box boxShadow={1} sx={{ p: 0.5 }}>
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={finished}
                      onChange={() => handleChange(task)}
                    />
                  }
                />
                <Typography
                  sx={{ textDecoration: finished ? "line-through" : "none" }}
                >
                  {task.title}
                </Typography>
              </Stack>
              <Stack spacing={1} direction="row">
                <IconButton onClick={handleEditClick}>
                  <EditNoteIcon />
                </IconButton>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      )}
    </Stack>
  );
}
