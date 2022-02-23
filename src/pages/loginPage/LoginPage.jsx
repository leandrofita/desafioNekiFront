import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/auth";
import "./styles.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const {receivedLogin, showAlert, setShowAlert } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState();
  const [checked, setChecked] = useState(false);

  useEffect(()=> {
    const recoverData = () => {
      setEmail(localStorage.getItem("keyEmail"))
      setPassword(localStorage.getItem("keyPassword"))
      console.log("Recuperado do storage: ", email, password)
    }
    recoverData();
  }, [])

  useEffect(()=> {
    loginAlert(showAlert)
    return ()=> setShowAlert(false);
  }, [showAlert])

  const handleLogin = async () => {
    receivedLogin(email, password, checked);
    loginAlert(showAlert)   
  };

   const loginAlert = (showAlert) =>{
    if(showAlert){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Login ou senha inválidos!',
        footer: 'Verifique seus dados e tente novamente!'
      })

    }
  }
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    
    <Container fluid id="login" >
      <img className="logo" src="/bigLogo.png" alt="logo" />
      <h1 style={{ color: "white", marginBottom: 18 }}>Seja bem-vindo(a)</h1>
      <form className="formLogin"  style={{maxHeight: "300px"}}>
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box style={{ width: "100%" }}>
            <FormControl
              variant="outlined"
              style={{
                width: "100%",
                marginTop: "0.5rem",
                borderRadius: "4px",
              }}
            >
              <TextField
                style={{ backgroundColor: "white", borderRadius: "4px" }}
                placeholder="Digite seu email"
                value={email}
                id="outlined-start-adornment"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
          </Box>

          <Box style={{ width: "100%" }}>
            <FormControl
              variant="outlined"
              style={{
                width: "100%",
                marginTop: "0.5rem",
                borderRadius: "4px",
              }}
            >
              <OutlinedInput
                style={{ backgroundColor: "white" }}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Digite sua senha"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  checked={checked}
                  onChange={(e) => {
                    setChecked(e.target.checked);
                  }}
                />
              }
              label="Lembrar login e senha"
            />
          </FormGroup>
        </Container>

        <Container id="buttonGroup">
          <div className="actionsLogin">
            <Button
              id="button"
              variant="primary"
              onClick={() => {
                handleLogin();
                console.log("showAlert", showAlert)
              }}
            >
              Entar
            </Button>
            <Button
              id="button"
              variant="primary"
              onClick={() => {
                navigate("/cadastro");
              }}
            >
              Cadastrar
            </Button>
          </div>
        </Container>
      </form>
    </Container>
  );
};

export default LoginPage;
