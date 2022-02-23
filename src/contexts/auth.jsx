import React, {createContext, useState } from "react";
import axios from "axios"

import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();



export const AuthProvider = ({children}) => {
    const URL = "http://localhost:8081/api/login";
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [token, setToken] =useState(null);
    const [showAlert, setShowAlert] =useState(false);

    

    const receivedLogin = async (email, password, checked) => {
        console.log("email: ", email, "password: ", password, "checked: ", checked)
        try{

            let response = await axios.post(URL, {login: email, password: password})
       
             console.log(email)
             console.log(password)
             setShowAlert(false)
             if (response.status === 200){
               setShowAlert(false)
               setUser(response.data);
               setToken(response.data.token);
               manageStorage(email, password, checked);
               navigate("/")
               console.log("Logei :", response.status, email, password, "user: ", user, "token: ", token)
             } else {
              setShowAlert(true)
             }
           } catch(err) {
             console.log("erro:", err)
             setShowAlert(true)
           } 
    }

    const manageStorage = (email, password, checked) => {
      if(checked){
        localStorage.setItem('keyEmail', email);
        localStorage.setItem('keyPassword', password);
      } else{
        localStorage.clear();
      }  
    } 

    const logout = () => {
      navigate("/login")
      setUser(null)
        console.log("logout")
    }
return (
    <AuthContext.Provider
        value={{authendicated: Boolean(token), user: user, setUser, token: token, showAlert: showAlert, setShowAlert, receivedLogin, logout}}
        >
        {children}
    </AuthContext.Provider>
)

}