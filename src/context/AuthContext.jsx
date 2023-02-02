import { useEffect } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  register: null,
  logout: null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        register: null,
        logout: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        register: null,
        logout: null,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        register: null,
        logout: null,
        loading: false,
        error: action.payload,
      };
    case "REGISTER_STATR":
      return {
        user: null,
        register: null,
        logout: null,
        loading: true,
        error: null,
      };
    case "REGISTER_SUCCESS":
      return {
        user: null,
        register: action.payload,
        logout: false,
        loading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        user: null,
        register: null,
        logout: action.payload,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        register: state.register,
        logout: state.logout,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
