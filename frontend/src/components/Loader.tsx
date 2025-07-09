import React from "react";
import { Spinner } from "react-bootstrap";

const Loader: React.FC = () => {
  return (
    <div className="text-center app-spinner">
      <Spinner className="w-100 h-100" animation="border" variant="light" />
    </div>
  );
};

export default Loader;