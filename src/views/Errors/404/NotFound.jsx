import React from "react";
import "./NotFound.scss";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="notFound">
      <img src="/img/notFound.gif" alt="Not found" />
      <Link to={{pathname: '/'}} style={{textDecoration:'none'}}>
        <Button color="inherit" variant="outlined">Llévame a casa</Button>
      </Link>
    </div>
  );
};
