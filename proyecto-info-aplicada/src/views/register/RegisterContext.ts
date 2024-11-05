import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SweetAlert } from "../../components/SweetAlert";
import { User } from "../../model/Interfaces";
import axios from "axios";
import React from "react";

export const useRegister = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [userError, setuserError] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const handleClickShowPassword = () => setIsPasswordShown((show) => !show);
  const [showPassword, setShowPassword] = React.useState(false);
  const [user, setUser] = React.useState<User>({
    id: 0,
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    password: "",
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleCheckUsername();

      if (userError) return;
      if (!handleCheckForm()) return;

      const response = await axios.post(
        "https://localhost:7253/api/Users/register",
        user
      );
      if (response.status === 200) {
        if (response.data.isSuccess === true) {
          SweetAlert("success", "User registered", "User has been registered", "Ok");
          navigate("/login");
        } else {
          SweetAlert("error", "Error", "User could not be registered", "Ok");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckUsername = async () => {
    try {
      const response = await axios.post(
        `https://localhost:7253/api/Users/username?username=${user.username}`
      );
      if (response.status === 200) {
        if (response.data.isAvailable === false) {
          setuserError(true);
        } else {
          setuserError(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckForm = async () => {
    if (
      user.email.length === 0 ||
      user.username.length === 0 ||
      user.password.length === 0 ||
      user.firstName.length === 0 ||
      user.lastName.length === 0 ||
      user.birthDate.length === 0
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
    userError,
    isPasswordShown,
    showPassword,
    handleClickShowPassword,
    handleMouseDownPassword,
    handleMouseUpPassword,
    handleInputChange,
    handleSubmit,
  };
};
