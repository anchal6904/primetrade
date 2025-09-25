// import { useEffect, useState } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [title, setTitle] = useState("");
//   const token = localStorage.getItem("token"); // JWT token

//   // Axios instance with token
//   const api = axios.create({
//     baseURL: "http://localhost:5000",
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   // Fetch tasks on component mount
//   const fetchTasks = async () => {
//     try {
//       const res = await api.get("/tasks"); // backend route: getTasks
//       setTasks(res.data.tasks);
//     } catch (err) {
//       console.error("Fetch tasks error:", err.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // Create new task
//   const handleAddTask = async (e) => {
//     e.preventDefault();
//     if (!title.trim()) return;

//     try {
//       const res = await api.post("/tasks", { title }); // backend route: createTask
//       setTasks([res.data.task, ...tasks]);
//       setTitle("");
//     } catch (err) {
//       console.error("Add task error:", err.response?.data || err.message);
//     }
//   };

//   // Toggle complete/uncomplete
//   const handleToggleComplete = async (taskId, completed) => {
//     try {
//       const res = await api.put(`/tasks/${taskId}`, { completed: !completed });
//       setTasks(tasks.map((task) => (task._id === taskId ? res.data.task : task)));
//     } catch (err) {
//       console.error("Update task error:", err.response?.data || err.message);
//     }
//   };

//   // Delete task
//   const handleDelete = async (taskId) => {
//     try {
//       await api.delete(`/tasks/${taskId}`);
//       setTasks(tasks.filter((task) => task._id !== taskId));
//     } catch (err) {
//       console.error("Delete task error:", err.response?.data || err.message);
//     }
//   };

//   return (
//     <div className="container py-5">
//       <h2 className="text-center mb-4">📋 My Tasks Dashboard</h2>

//       {/* Add Task Form */}
//       <form onSubmit={handleAddTask} className="d-flex gap-2 mb-4">
//         <input
//           type="text"
//           className="form-control form-control-lg flex-grow-1"
//           placeholder="Enter a new task"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <button className="btn btn-success btn-lg flex-shrink-0" style={{ minWidth: "150px" }} type="submit">
//           Add Task
//         </button>
//       </form>

//       {/* Tasks List */}
//       <div className="row">
//         {tasks.length === 0 ? (
//           <p className="text-center text-muted">No tasks added yet.</p>
//         ) : (
//           tasks.map((task) => (
//             <div key={task._id} className="col-12 col-md-6 col-lg-4 mb-3">
//               <div className="card shadow-sm h-100">
//                 <div className="card-body d-flex flex-column">
//                   <h5
//                     className={`card-title ${
//                       task.completed ? "text-decoration-line-through text-muted" : ""
//                     }`}
//                   >
//                     {task.title}
//                   </h5>
//                   <div className="mt-auto d-flex justify-content-between">
//                     <button
//                       className={`btn btn-sm ${
//                         task.completed ? "btn-secondary" : "btn-primary"
//                       }`}
//                       onClick={() => handleToggleComplete(task._id, task.completed)}
//                     >
//                       {task.completed ? "Undo" : "Complete"}
//                     </button>
//                     <button
//                       className="btn btn-sm btn-danger"
//                       onClick={() => handleDelete(task._id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("token");

  const api = axios.create({
    baseURL: "http://localhost:5000",
    headers: { Authorization: `Bearer ${token}` },
  });

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data.tasks);
    } catch (err) {
      console.error("Fetch tasks error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      const res = await api.post("/tasks", { title });
      setTasks([res.data.task, ...tasks]);
      setTitle("");
    } catch (err) {
      console.error("Add task error:", err.response?.data || err.message);
    }
  };

  const handleToggleComplete = async (taskId, completed) => {
    try {
      const res = await api.put(`/tasks/${taskId}`, { completed: !completed });
      setTasks(tasks.map((task) => (task._id === taskId ? res.data.task : task)));
    } catch (err) {
      console.error("Update task error:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error("Delete task error:", err.response?.data || err.message);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">📋 My Tasks Dashboard</h2>

      <form onSubmit={handleAddTask} className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <form onSubmit={handleAddTask} className="d-flex gap-2 mb-4">
        <input
          type="text"
          className="form-control form-control-lg flex-grow-1"
          placeholder="Enter a new task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn btn-success btn-lg flex-shrink-0" style={{ minWidth: "150px" }} type="submit">
          Add Task
        </button>
      </form>

      <div className="row">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-muted">No tasks found.</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task._id} className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="card shadow-sm h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className={`card-title ${task.completed ? "text-decoration-line-through text-muted" : ""}`}>
                    {task.title}
                  </h5>
                  <div className="mt-auto d-flex justify-content-between">
                    <button
                      className={`btn btn-sm ${task.completed ? "btn-secondary" : "btn-primary"}`}
                      onClick={() => handleToggleComplete(task._id, task.completed)}
                    >
                      {task.completed ? "Undo" : "Complete"}
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
