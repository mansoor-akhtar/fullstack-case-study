import React from "react";
import { Provider } from "react-redux";
import Routes from "./routes/Routes";
import store from "./store/store";
import { setAuthToken } from "./util"; 
import { logoutUser } from "./store/action";
import { setCurrentUser } from "./store/reducers/authReducer";
import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "./types";
import "./App.css";

if (localStorage.jwtToken) {
  // Set auth token header
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info and expiration
  const decoded = jwtDecode<DecodedToken>(localStorage.jwtToken);

  // Set user and isAuthenticated in store
  store.dispatch(setCurrentUser());

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
  }
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
