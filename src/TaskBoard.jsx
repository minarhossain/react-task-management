import React, { useState } from "react";
import SearchTask from "./task/SearchTask";
import TaskAction from "./task/TaskAction";
import TaskList from "./task/TaskList";
import AddTaskModal from "./task/AddTaskModal";
const defaultTask = {
  id: crypto.randomUUID(),
  title: "Integration API",
  description:
    "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
  tags: ["Web", "Python", "API", "Next"],
  priority: "High",
  isFavorite: true,
};

const TaskBoard = () => {
  const [tasks, setTasks] = useState([defaultTask]);
  const [showModal, setShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  // Add Task function
  const handleAddTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setShowModal(false);
  };

  // Edit task function
  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowModal(true);
  };

  return (
    <section className="mb-20 flex justify-center" id="tasks">
      {showModal && (
        <AddTaskModal taskToUpdate={taskToUpdate} onSave={handleAddTask} />
      )}
      <div className="container">
        <SearchTask />

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction onAddTask={() => setShowModal(true)} />
          <TaskList tasks={tasks} onEdit={handleEditTask} />
        </div>
      </div>
    </section>
  );
};

export default TaskBoard;
