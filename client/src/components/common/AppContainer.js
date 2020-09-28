import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    height: "100vh",
  },
});

const AppContainer = ({ children }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        {children}
      </Grid>
    </React.Fragment>
  );
};

export default AppContainer;
