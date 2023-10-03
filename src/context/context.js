import React, { useState, useEffect, createContext } from "react";
import { isLogin } from "../utils";
import { axiosInstance } from "../utils/axiosIntance";

export const Context = createContext();

const ContextProvider = (props) => {
  //-----------------------------------------------------------------
  const [is_logged, set_is_logged] = useState(false);
  //-----------------------------------------------------------------

  const checkLogin = () => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data?.id !== undefined) set_is_logged(true);
    else set_is_logged(false);
  };

  useEffect(() => {
    checkLogin();
  }, []);

  //------------------------------------------------------------------
  let [dil, setDil] = useState("tm");
  useEffect(() => {
    let dilData = localStorage.getItem("OnlineDil");
    if (dilData) {
      setDil(JSON.parse(dilData));
    } else {
      setDil("tm");
      localStorage.setItem("OnlineDil", JSON.stringify(dil));
    }
  }, []);

  const ChangeDil = (event) => {
    setDil(event);
    localStorage.setItem("OnlineDil", JSON.stringify(event));
  };

  //---------------------------------------------------------------------------------------------
  const logout = () => {
    localStorage.removeItem("OnlineDil");
    localStorage.removeItem("userData");
    checkLogin();
  };

  //---------------------------------------------------------------------------------------------

  return (
    <Context.Provider
      value={{
        is_logged,
        checkLogin,
        logout,

        dil,
        ChangeDil,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
