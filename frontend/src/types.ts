import React from "react";

export interface RouteProps {
    path: string,
    exact: boolean,
    component: React.FC;
}

export interface DecodedToken {
  exp: number;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface ApiFunctionProps {
  onSuccess: Function,
  onError: Function,
  params: any,
  data: Object | null
}