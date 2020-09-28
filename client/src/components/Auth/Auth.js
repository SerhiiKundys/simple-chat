import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

import AppContainer from "../common/AppContainer";

const useStyles = makeStyles((theme) => ({
  authContainer: {
    backgroundColor: "white",
    padding: 20,
    height: 250,
    [theme.breakpoints.up("sm")]: {
      borderRadius: 10,
    },
  },
  authTitle: {
    marginBottom: 20,
  },
  inputField: {
    marginBottom: 18,
  },
  submitLink: {
    textDecoration: "none",
    paddingTop: 100,
  },
  submitButton: {
    borderColor: "#FE6B8B",
    color: "#FE6B8B",
  },
}));

const Auth = () => {
  const [nickname, setNickname] = React.useState("");
  const [chat, setChat] = React.useState("");
  const classes = useStyles();

  const onChatChange = (e) => {
    setChat(e.target.value);
  };

  const onNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const onJoinChat = (e) => {
    if (!nickname || !chat) e.preventDefault();
  };

  return (
    <AppContainer>
      <Grid item xs={12} sm={9} md={6} className={classes.authContainer}>
        <Typography variant="h4" className={classes.authTitle}>
          Join a chat
        </Typography>
        <div>
          <Input
            autoFocus
            fullWidth
            placeholder="Enter a chat identifier"
            type="text"
            onChange={onChatChange}
            color="secondary"
            className={classes.inputField}
          />
        </div>
        <div>
          <Input
            fullWidth
            placeholder="Enter your nickname"
            type="text"
            onChange={onNicknameChange}
            color="secondary"
            className={classes.inputField}
          />
        </div>
        <Link
          to={`/chat?nickname=${nickname}&chat=${chat}`}
          onClick={onJoinChat}
          className={classes.submitLink}
        >
          <Button variant="outlined" className={classes.submitButton}>
            Join
          </Button>
        </Link>
      </Grid>
    </AppContainer>
  );
};

export default Auth;
