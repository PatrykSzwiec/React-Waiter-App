import React from 'react';
import { Spinner } from 'react-bootstrap';
import "./Loader.scss";

const Loader = () => {
  return (
    <div className="loader-container">
      <Spinner animation="border" role="status" variant="primary" className="loader" />
    </div>
  );
};

export default Loader;