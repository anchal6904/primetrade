import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate=useNavigate();
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" 
         style={{ backgroundColor: "#1e1e1e" }}>
      <div className="card p-5 text-center shadow" 
           style={{ 
             maxWidth: "400px", 
             borderRadius: "15px", 
             backgroundColor: "#2c2c2c",
             color: "#ffffff"
           }}>
        <h1 className="mb-4 fw-bold" style={{ color: "#00d1b2" }}>
          Welcome, Please Login
        </h1><br />
        <button className="btn btn-dark btn-lg w-100" 
                style={{ 
                  borderRadius: "50px", 
                  backgroundColor: "#00d1b2", 
                  color: "#1e1e1e", 
                  border: "none",
                  transition: "0.3s"
                }}
                onMouseOver={e => e.target.style.backgroundColor = "#00a887"}
                onMouseOut={e => e.target.style.backgroundColor = "#00d1b2"} 
                onClick={()=>navigate('/login')}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Home
