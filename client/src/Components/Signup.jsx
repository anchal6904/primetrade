

// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!name || !email || !password) {
//       setError("Please fill in all fields");
//       return;
//     }

//     try {
//       const res = await axios.post("http://localhost:5000/user/signup", { name, email, password });
//       if (res.status === 201) {
//         navigate("/login");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#1e1e1e" }}>
//       <div className="card p-5 shadow" style={{ maxWidth: "500px", width: "90%", borderRadius: "20px", backgroundColor: "#2c2c2c", color: "#ffffff" }}>
//         <h2 className="mb-4 text-center" style={{ color: "#00d1b2", fontSize: "2rem" }}>Signup</h2>
//         {error && <p className="text-danger text-center">{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="name" className="form-label text-light">Name</label>
//             <input type="text" className="form-control form-control-lg" id="name" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="email" className="form-label text-light">Email</label>
//             <input type="email" className="form-control form-control-lg" id="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
//           </div>
//           <div className="mb-4">
//             <label htmlFor="password" className="form-label text-light">Password</label>
//             <input type="password" className="form-control form-control-lg" id="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
//           </div>
//           <button type="submit" className="btn w-100 btn-lg" style={{ backgroundColor: "#00d1b2", color: "#1e1e1e", borderRadius: "50px", fontSize: "1.2rem" }}>
//             Signup
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return false;
    }
    if (name.length < 3) {
      setError("Name must be at least 3 characters");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    try {
      const res = await axios.post("http://localhost:5000/user/signup", { name, email, password });
      if (res.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#1e1e1e" }}>
      <div className="card p-5 shadow" style={{ maxWidth: "500px", width: "90%", borderRadius: "20px", backgroundColor: "#2c2c2c", color: "#ffffff" }}>
        <h2 className="mb-4 text-center" style={{ color: "#00d1b2", fontSize: "2rem" }}>Signup</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="form-label text-light">Name</label>
            <input type="text" className="form-control form-control-lg" id="name" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="form-label text-light">Email</label>
            <input type="email" className="form-control form-control-lg" id="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label text-light">Password</label>
            <input type="password" className="form-control form-control-lg" id="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn w-100 btn-lg" style={{ backgroundColor: "#00d1b2", color: "#1e1e1e", borderRadius: "50px", fontSize: "1.2rem" }}>
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
