import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../utils/constant";

const Login = ({ updateLoginStatus, updtaeRefresh }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmitForm = async (dataval) => {
    try {
      await axios.post(`${API_URL}/auth/login`, dataval);
      await updateLoginStatus();
      await updtaeRefresh();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="add-form">
      {" "}
      <Form onSubmit={handleSubmit(onSubmitForm)}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", {
              required: "This is required field",
            })}
          />
          {errors.email && <p className="error-msg">{errors.email.message}</p>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            {...register("password", {
              required: "This is required field",
            })}
          />
          {errors.password && (
            <p className="error-msg">{errors.password.message}</p>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
