import ToDoContext from "./context/todolist";
import ToDoCreate from "./components/ToDoCreate";
import ToDoList from "./components/ToDoList";
import { useContext, useEffect } from "react";
import { Typography, Stack } from "@mui/material";
import "./App.css";
import ToDoFooter from "./components/ToDoFooter";
import { Routes, Route } from "react-router-dom";
import Stats from "./components/Stats";

function App() {
  const { fetchTasks } = useContext(ToDoContext);
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/stats" element={<Stats />} />
        <Route
          path="/"
          element={
            <Stack
              direction="column"
              alignItems="center"
              justify="center"
              marginTop={4}
            >
              <Typography
                variant="h2"
                gutterBottom
                sx={{ fontWeight: "bold", fontStyle: "italic" }}
              >
                To-Do List
              </Typography>
              <ToDoCreate />
              <ToDoList />
              <Stack
                sx={{
                  marginTop: "calc(10% + 60px)",
                  marginBottom: "10px",
                  width: "100%",
                  position: "fixed",
                  bottom: 0,
                }}
                alignItems="center"
              >
                <ToDoFooter />
              </Stack>
            </Stack>
          }
        />
      </Routes>
    </>
  );
}

export default App;
