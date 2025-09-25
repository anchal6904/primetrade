import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar.jsx";
import Home from "./pages/Home";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./pages/Dashboard.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import Update from "./pages/Update.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-profile"
          element={
            <PrivateRoute>
              <Update />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Navbar from "./Components/Navbar.jsx";
// import Home from "./pages/Home.jsx";
// import Login from "./Components/Login.jsx";
// import Signup from "./Components/Signup.jsx";
// import Dashboard from "./pages/Dashboard.jsx";
// import PrivateRoute from "./Components/PrivateRoute.jsx"; // make sure you place PrivateRoute here

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         {/* default route → redirect to /dashboard if logged in */}
//         <Route path="/" element={<Navigate to="/dashboard" replace />} />

//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route
//           path="/dashboard"
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           }
//         />

//         {/* optional Home page (if you still want to keep it separate) */}
//         <Route path="/home" element={<Home />} />

//         {/* fallback for unknown routes */}
//         <Route
//           path="*"
//           element={
//             <div className="container py-5">
//               <h3>404 - Page Not Found</h3>
//             </div>
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;
