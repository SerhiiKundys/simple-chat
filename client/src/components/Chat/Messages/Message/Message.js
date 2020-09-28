import React from "react";
import ReactEmoji from "react-emoji";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  messageContainer: {
    display: "flex",
    padding: "5px 10px",
    margin: "5px 0",
  },
  adminMessage: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  userMessage: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  userNameContainer: {
    display: "inline-block",
    padding: "0 10px",
    borderRadius: 10,
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  },
}));

const Message = ({ message: { user, text }, nickname }) => {
  const classes = useStyles();

  const isSentByCurrentUser = nickname.trim().toLowerCase() === user;

  return (
    <Paper
      className={`${classes.messageContainer} ${
        isSentByCurrentUser ? classes.userMessage : classes.adminMessage
      }`}
    >
      <Typography className={classes.userNameContainer} variant="subtitle2">
        {user}
      </Typography>
      <Typography variant="h6">{ReactEmoji.emojify(text)}</Typography>
    </Paper>
  );
};

export default Message;
