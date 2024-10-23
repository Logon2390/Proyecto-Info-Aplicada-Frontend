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

// States

const Login: React.FC = () =>  {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
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
        [name]: type === 'checkbox' ? checked : value
    });
};

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (handleCheckForm()) return;

      const response = await axios.post("https://localhost:7253/api/Users/login", {
        username: user.username,
        password: user.password,
      });
      
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

  return (
    <Container className="justify-content-md-center mt-5">
      <Row>
        <Col>
          
        </Col>

        <Col>
          <div className="flex flex-col justify-center items-center min-bs-[100dvh] relative p-6">
            <Card className="flex flex-col sm:is-[450px]">
              <CardContent className="p-6 sm:!p-12">
                <div className="flex flex-col gap-5">
                  <div>
                    <Typography variant="h4">{`Welcome!👋🏻`}</Typography>
                    <Typography className="mb-3">
                      Please sign-in to your account and start the adventure
                    </Typography>
                  </div>
                  <form
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    <TextField
                      autoFocus
                      fullWidth
                      label="Username"
                      name='username'
                      value={user.username}
                      className="mb-3"
                      onChange={handleInputChange}
                      required
                      error={error}
                      InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                      className="mb-3"
                      fullWidth
                      label="Password"
                      id="outlined-adornment-password"
                      type={isPasswordShown ? "text" : "password"}
                      name='password'
                      value={user.password}
                      onChange={handleInputChange}
                      required
                      error={error}
                      helperText={error ? 'Email or password incorrect' : ''}
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

                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      className="mb-3"
                    >
                      Log In
                    </Button>

                    <div className="flex justify-center items-center flex-wrap gap-2">
                      <Divider className="gap-3">New on our platform?</Divider>
                      <Link color="primary" to="/register">Create an account</Link>
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

export default Login;
