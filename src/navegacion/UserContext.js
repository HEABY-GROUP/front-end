import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const values = {
    correo,
    setCorreo,
    contrasena,
    setContrasena,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
