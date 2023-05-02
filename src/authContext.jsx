import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      //TODO
      return {
        ...state,
        isAuthenticated: action.payload?.user? true: false,
        user: action.payload?.user,
        role: action.payload?.role,
        token: action.payload?.token, 
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        role: null,
        token: null
      };

    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = async (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");

  try {
    const response = await sdk.check(role);
    const responseCheck= await response.json();
    
  } catch (error) {
    if (error.message === "TOKEN_EXPIRED") {
      dispatch({
        type:"LOGOUT"
      })
      window.location.href = "/" + role + "/login";
    }
  }
  

 
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const role = JSON.parse(localStorage.getItem("role"));
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));


  React.useEffect(() => {
    //TODO
    dispatch({
      type: "LOGIN",
      payload: {
        user,
        role,
        token,
      }
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
