import React from "react";
import { Alert, AlertTitle, Button, Divider, TextField } from '@mui/material';
import { Link } from "react-router-dom";
const Unauthorized: React.FC = () => {
  return (
    <>
      <Alert severity="error" variant="standard">
        <AlertTitle>{"Es necesario inicia sesión"}</AlertTitle>
        Inicia sesión para acceder a esta página
        <Link to="/login"> Iniciar sesión</Link>
      </Alert>
    </>
  );
};

export default Unauthorized;
