import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Config/Firebase";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthenticatedContext } from '../../../Context/AuthenticatedContext';
import { useNavigate } from 'react-router-dom';

const initialState = { email: "", password: "", confirmPassword: "" };

function SignUp() {
  const { setIsAuthenticated } = useContext(AuthenticatedContext);
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, password, confirmPassword } = state;

    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          toast.success('User registered successfully!');
          setIsAuthenticated(true);
          navigate("/dashboard/viewAccounts");
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => setIsLoading(false));
    } else {
      toast.error('Passwords do not match!');
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 w-100" style={{ maxWidth: "400px" }}>
        <h3 className="text-center">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              id="email" 
              name="email" 
              placeholder="Enter your email" 
              required 
              onChange={handleChange} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="password" 
              name="password" 
              placeholder="Enter your password" 
              required 
              onChange={handleChange} 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input 
              type="password" 
              className="form-control" 
              id="confirmPassword" 
              name="confirmPassword" 
              placeholder="Re-enter your password" 
              required 
              onChange={handleChange} 
            />
          </div>
          <button type="submit" disabled={isLoading} className="btn btn-primary w-100">
            {isLoading ? <div className="spinner-border spinner-border-sm"></div> : "Sign Up"}
          </button>
        </form>
        <div className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
