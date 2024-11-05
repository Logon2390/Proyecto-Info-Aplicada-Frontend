import * as React from "react";

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
import { Link } from "react-router-dom";
import { useRegister } from "./RegisterContext";

const Register: React.FC = () => {

  const {
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
  } = useRegister();
  
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
                      error={error}
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
                      error={error}
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
                      error={error}
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
                      error={error}
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
                      error={error}
                      required
                      InputLabelProps={{ shrink: true }}
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
                      <Divider className="gap-3">
                        Already have an account?
                      </Divider>
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
