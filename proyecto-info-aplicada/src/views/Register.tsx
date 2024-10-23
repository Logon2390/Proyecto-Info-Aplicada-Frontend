// React Imports
import { useState } from "react";
import type { FormEvent } from "react";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

// MUI Imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";

//other
import { User } from "../model/Interfaces";
import { useAuth } from "../auth/AuthContext";
import axios from "axios";
import sweetAlert from "sweetalert2";

// States

const Register: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
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
    birthDate: new Date(),
    password: ""
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
      const response = await axios.post(
        "https://localhost:7253/api/Users/register",
        user
      );
      if (response.status === 200) {
        if (response.data.isSuccess === true) {
          sweetAlert.fire("Success", "User registered successfully", "success");
          navigate("/login");
        } else {
          setuserError(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="justify-content-md-center mt-5">
      <Row>
        <Col>
          <h1 className="text-center">Register</h1>
        </Col>

        <Col>
          <div className="flex flex-col justify-center items-center min-bs-[100dvh] relative p-6">
            <Card className="flex flex-col sm:is-[450px]">
              <CardContent className="p-6 sm:!p-12">
                <div className="flex flex-col gap-5">
                  <div>
                    <Typography variant="h4">{`Welcome!👋🏻`}</Typography>
                    <Typography className="mb-3">
                      Start a new account with us!🚀
                    </Typography>
                  </div>
                  <form
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    <TextField
                      fullWidth
                      className="mb-3"
                      label="Email"
                      id="form1"
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                      required
                    />

                    <TextField
                      autoFocus
                      fullWidth
                      label="Username"
                      name="username"
                      value={user.username}
                      className="mb-3"
                      onChange={handleInputChange}
                      required
                      error={userError}
                      helperText={
                        userError ? "This username is already in use" : ""
                      }
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      className="mb-3"
                      fullWidth
                      label="Password"
                      id="outlined-adornment-password"
                      type={isPasswordShown ? "text" : "password"}
                      name="password"
                      value={user.password}
                      onChange={handleInputChange}
                      required
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      fullWidth
                      className="mb-3"
                      label="Name"
                      id="form1"
                      type="text"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleInputChange}
                      required
                    />

                    <TextField
                      fullWidth
                      className="mb-3"
                      label="Last Name"
                      id="form1"
                      type="text"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleInputChange}
                      required
                    />

                    <TextField
                      fullWidth
                      className="mb-3"
                      label="Birth Date"
                      id="form1"
                      type="date"
                      name="birthDate"
                      value={user.birthDate}
                      onChange={handleInputChange}
                      required
                      InputProps={{
                        inputProps: {
                          max: new Date().toISOString().split("T")[0],
                        },
                      }}
                    />

                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      className="mb-3"
                    >
                      Sign Up
                    </Button>

                    <div className="flex justify-center items-center flex-wrap gap-2">
                      <Divider className="gap-3">Already have an account?</Divider>
                      <Link color="primary" to="/login">
                        Sign In
                      </Link>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
