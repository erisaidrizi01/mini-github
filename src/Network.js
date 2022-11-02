import axios from "axios";
import store from "./Redux/store";
import { clearUserData } from "./Pages/SignIn/SignIn.actions";
import { createBrowserHistory } from "history";
export let history = createBrowserHistory();

axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.auth = {
      username: "Basic",
      password: token,
    };
  }
  return config;
});

const { dispatch } = store;

axios.interceptors.response.use(
  function(config) {
    return config;
  },

  function(error) {
    console.log("response interceptors");
    if (
      error.response.status === 401 ||
      error.response.status === 403 ||
      error.response.statusText === "Unauthorized"
    ) {
      localStorage.clear();
      dispatch(clearUserData());
      history.push("/signin");
    }
    if (error.response.status === 404) {
      history.push("/*");
    }
  }
);
