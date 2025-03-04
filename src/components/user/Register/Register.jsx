import React, { useContext, useState } from "react";
import AppContext from "../../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { name, email, password } = formData;

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await register(name, email, password);

    if (result.success) {
      navigate("/login");
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
        <h2 className="text-center mb-4">Sign Up</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Name
            </label>
            <input
              name="name"
              type="text"
              id="name"
              value={formData.name}
              onChange={onChangeHandler}
              required
              className="form-control"
            />
          </div>
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
            <button type="submit" className="btn btn-primary w-50 ">
              Sign Up
            </button>
          </div>
        </form>
         <div className="text-center mt-3">
                  <p>
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </div>
      </div>
    </div>
  );
};

export default Register;
