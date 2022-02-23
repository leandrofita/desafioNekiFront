import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./styles.css";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ConfirmPassword, setCofirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState();
    const URL = "http://localhost:8081/clients";
    const navigate = useNavigate();

    const clearFields = () => {
      setEmail("");
      setPassword("");
      setCofirmPassword("");
    }

    useEffect(()=> {
      clearFields()
    }, [])

    const goBack = () => {
      navigate("/login");
    }

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const  handleRegister = async () => {
        
        if(password === ConfirmPassword && email && password){

            try{
  
                let response = await axios.post(URL, {login: email, password: password})
           
                 console.log(email)
                 console.log(password)
                 console.log(response)
                 if (response.status === 201){
                   clearFields()
                   Swal.fire({
                    icon: "success",
                    title: "Tudo certo por aqui!",
                    text: "Usuário cadastrado com sucesso!"
                  })
                  goBack()
                   console.log("Logei :", response.status, email, password)
                 }
               } catch(err) {
                 console.log("erro:", err)
               }

        } else {
          Swal.fire({
            icon: "warning",
            title: "Ops...",
            text: "Não pode haver nenhum campo vazio e as senhas precisam ser iguais"
          })
        }
      
  
    }
    return (
      <Container fluid id="login">
        
        <h1 className="title">Crie sua conta</h1>
        <form className="form">
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
                value={ConfirmPassword}
                placeholder="Digite sua senha"
                onChange={(e) => {
                  setCofirmPassword(e.target.value);
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
        </Container>

          <Container id="buttonGroup">
            <div className="actions">
              <Button id="button" variant="primary" onClick={()=>{handleRegister()}}>
                Cadastrar
              </Button>
            </div>
          </Container>
        </form>
        
      </Container>
    );
  };
  
  export default RegisterPage;