import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../../../context/AppContext";

const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { email, password } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await login(email, password);

    if (result.success) {
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center my-5 mx-3 bg-light">
      <div
        className="p-4 shadow rounded bg-white"
        style={{
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              value={formData.email}
              onChange={onChangeHandler}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              name="password"
              type="password"
              id="password"
              value={formData.password}
              onChange={onChangeHandler}
              required
              className="form-control"
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary w-50">
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
          <p>
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
