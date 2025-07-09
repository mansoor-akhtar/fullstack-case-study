import axios from "./axios-instance";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const navbarBrand = "World News";

export const navs = [
    { nav: "Home", page: "/" }
];

/**
 * Set auth token to send with each request
 * @param token - The JWT token to set in the Authorization header
 */
export const setAuthToken = (token: string | null | boolean | undefined): void => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

/**
 * capitalize
 * @param {*} string 
 * @returns 
 */
export const capitaLize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * check if provided value is empty or not
 * @param value 
 * @returns 
 */
export const isEmpty = (value:any) =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);


/**
 * check if property exist or not
 * @param {*} obj
 * @param {*} prop
 * @return boolean
 */
export const gotProperty = (obj: any, prop: string) => {
  return !isEmpty(obj) ? prop in obj : false;
};


/**
 * Generate a query string form object params
 * @param {*} params 
 */
export const getQueryString = (params:any) => {
  let queryString = [];
    for (let param in params) {
      if (!isEmpty(params[param]))
        queryString.push(encodeURIComponent(param) + "=" + encodeURIComponent(params[param]))
    }
    return queryString.join("&")
}

/**
 * with router high order component
 * @param {*} Component
 * @returns
 */
export const withRouter = (Component:any) => {
  const ComponentWithRouterProp = (props:any) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };
  return ComponentWithRouterProp;
};