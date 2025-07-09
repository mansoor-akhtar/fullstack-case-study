import type { AppDispatch } from "./store";
import { setAuthToken, isEmpty, getQueryString } from "../util";
import { clearErrors } from "./reducers/errorReducer";
import { logoutSuccess } from "./reducers/authReducer";
import type { ApiFunctionProps } from "../types";
import axios from "../axios-instance";
import type { RegisterFormValues } from "../types";
import type { LoginFormValues } from "../types";
import { getErrors } from "./reducers/errorReducer";
import { setCurrentUser } from "./reducers/authReducer";



export const logoutUser = () => (dispatch: AppDispatch) => {
  console.log('I am called');
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(clearErrors());
  dispatch(logoutSuccess());
};

export const loginUser = (userData: LoginFormValues) => (dispatch: any) => {
  axios
    .post("login", userData)
    .then((res) => {
      // Save to localStorage
      const { access_token } = res.data.data;

      // Set token to ls
      localStorage.setItem("jwtToken", access_token);
      // Set token to Auth header
      setAuthToken(access_token);
      dispatch(setCurrentUser());
    })
    .catch((err) => {
      let message = err.response.data.message;
      if (!isEmpty(err.response.data.data)) {
        message = err.response.data.data;
      }
      dispatch(
        getErrors(message)
      );
    });
}

export const registerUser = (userData: RegisterFormValues) => (dispatch:any) => {
  axios
    .post("signup", userData)
    .then((res) => {
      // Save to localStorage
      const { access_token } = res.data.data;

      // Set token to ls
      localStorage.setItem("jwtToken", access_token);
      // Set token to Auth header
      setAuthToken(access_token);
      dispatch(setCurrentUser());
    })
    .catch((err) => {
      let message = err.response.data.message;
      if (!isEmpty(err.response.data.errors)) {
        message = err.response.data.errors;
      }
      dispatch(
        getErrors(message)
      );
    });
}



/**
 * Get news
 * @param {*} options
 * @returns
 */
export const getNews = (options:ApiFunctionProps) => async () => {
  const { onSuccess, onError, params } = options || {};
  let newsUrl = "news";
  if (!isEmpty(params))
    newsUrl = `${newsUrl}?${getQueryString(params)}`;
  axios
    .get(newsUrl)
    .then((res) => {
      const { data } = res || {};
      if (onSuccess) {
        onSuccess(data);
      }
    })
    .catch((err) => {
      if (onError) {
        onError(err);
      }
    });
};

/**
 * Get categories
 * @param {*} options
 * @returns
 */
export const getCategories = (options:ApiFunctionProps) => async () => {
  const { onSuccess, onError } = options || {};
  axios
    .get("categories")
    .then((res) => {
      const { data } = res || {};
      if (onSuccess) {
        onSuccess(data);
      }
    })
    .catch((err) => {
      if (onError) {
        onError(err);
      }
      
    });
};


/**
 * Get article sources
 * @param {*} options
 * @returns
 */
export const getSources = (options:ApiFunctionProps) => async () => {
  const { onSuccess, onError } = options || {};
  axios
    .get("sources")
    .then((res) => {
      const { data } = res || {};
      if (onSuccess) {
        onSuccess(data);
      }
    })
    .catch((err) => {
      if (onError) {
        onError(err);
      }
    });
};


export const getUserPreferences = (options:ApiFunctionProps) => async () => {
  const { onSuccess, onError } = options || {};
  axios
    .get("user-preferences")
    .then((res) => {
      const { data } = res || {};
      if (onSuccess) {
        onSuccess(data);
      }
    })
    .catch((err) => {
      if (onError) {
        onError(err);
      }
    });
}


export const saveUserPreferences = (options:ApiFunctionProps) => async () => {
  const { onSuccess, onError, data } = options || {};
  axios
    .post("user-preferences", data)
    .then((res) => {
      const { data: resData } = res || {};
      onSuccess(resData);
    })
    .catch((error) => {
      if (onError) {
        onError(error);
      }
  });
};