import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  top: {
    animationDuration: "550ms",
  },
  container_loading: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    position: 'fixed',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.container_loading}>
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        size={100}
        thickness={2}
      />
    </div>
  );
};
