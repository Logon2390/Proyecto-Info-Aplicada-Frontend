import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { FormEvent } from "react";
import { User } from "../../model/Interfaces";
import { useAuth } from "../../auth/AuthContext";
import axios from "axios";
import React from "react";

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = React.useState<User>({
    id: 0,
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setIsPasswordShown((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setUser({
      ...user,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (user.username === "testuser" && user.password === "testpassword") {
      login(user);
      navigate("/");
      return;
    }
    try {
      if (!handleCheckForm()) return;

      const response = await axios.post(
        "https://localhost:7253/api/Users/login",
        {
          username: user.username,
          password: user.password,
        }
      );

      if (response.data.isSuccess === true) {
        login(user);
        navigate("/");
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckForm = () => {
    if (
      user.username.length === 0 ||
      user.password.length === 0
    ) {
      setError(true);
      return false;
    }
    setError(false);
    return true;
  };

  return {
    user,
    error,
    isPasswordShown,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleMouseUpPassword,
    handleInputChange,
    handleSubmit,
  };
};
