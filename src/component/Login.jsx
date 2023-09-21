"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const router = useRouter();

  const isValidEmail = (email) => {
    // Basic email format validation using a regular expression
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      return setError("Email and Password is required ");
    } else if (!isValidEmail(formData.email)) {
      setError("Invalid email");
    } else if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
    } else {
      try {
        const response = await signIn("credentials", {
          ...formData,
          redirect: false,
        });

        if (response.error) {
          setError("invalid credentials");
          return;
        }
        setFormData({
          email: "",
          password: "",
        });
        setError("");
        router.push("/gallery");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="container">
        <h1>Enter your details</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          {/* <p>Error message</p> */}
          <button>Login</button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
