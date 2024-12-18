import React, { useState, useEffect, useContext } from 'react'
import { AuthenticatedContext } from '../../../Context/AuthenticatedContext';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, provider } from '../../../Config/Firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const initialState = { email: "", password: "" }

function Login() {
  const [state, setState] = useState(initialState);
  const [user, setUser] = useState({});
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthenticatedContext);
  const { userId, setUserId } = useContext(AuthenticatedContext);

  const navigate = useNavigate();

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setUserId(user.uid);
      } else {
        setUser({});
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = state;

    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success('User has been logged In!', {
          position: "bottom-left",
          autoClose: 5000,
        });
        setIsAuthenticated(true);
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error("Password/email incorrect", {
          position: "bottom-left",
          autoClose: 5000,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className='mvh-100 loginPage d-flex justify-content-center align-items-center'>
      <div className="container">
        <div className="row">
          <div className="col">
            <Link className='btn btn-home' to="/"><i className="fa-solid fa-arrow-left"></i></Link>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
            <div className="card w-100">
              <div className="card-body">
                <h3>LOGIN</h3>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                  <br />
                  <div className="input-group flex-nowrap">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Email"
                      name='email'
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group flex-nowrap">
                    <input
                      type={isPasswordShow ? "text" : "password"}
                      className="form-control"
                      id="password"
                      name='password'
                      placeholder="Password"
                      required
                      onChange={handleChange}
                    />
                    <button
                      type='button'
                      className="input-group-text"
                      onClick={() => { setIsPasswordShow(!isPasswordShow) }}>
                      <i className={`fa-solid fa-eye${isPasswordShow ? "" : "-slash"}`}></i>
                    </button>
                  </div>
                  <div className="mb-3 mt-1 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn loginButton">
                      { !isLoading ? "Login" : <div className='spinner-border spinner-border-sm'></div> }
                    </button>
                  </div>
                  <div className="text-end">
                    <Link to="/forgotPassword">Forgot Password?</Link>
                  </div>
                </form>
                <div style={{ position: "relative" }}>
                  <span className='OR text-center'>
                    <i className="fa-solid fa-o"></i><i className="fa-solid fa-r"></i>
                  </span>
                  <hr />
                </div>
                <div className='text-center'>
                  <span>Need an account? <Link to="/signUp">Signup</Link></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
