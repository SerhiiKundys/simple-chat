import React from "react";
import Message from "./Message/Message";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  messagesContainer: {
    [theme.breakpoints.down("sm")]: {
      height: "72vh",
      maxHeight: "72vh",
    },
    [theme.breakpoints.up("md")]: {
      height: "76vh",
      maxHeight: "76vh",
    },

    overflow: "auto",
    padding: 10,
  },
}));

const Messages = ({ messages, nickname }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.messagesContainer}>
      {messages &&
        messages.map((message, i) => (
          <Message message={message} nickname={nickname} key={i} />
        ))}
    </Paper>
  );
};

export default Messages;
