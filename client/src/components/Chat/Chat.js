import React from "react";
import queryString from "query-string";
import io from "socket.io-client";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import AppContainer from "../common/AppContainer";

import Messages from "./Messages/Messages";

let socket;
const EndPoint = "localhost:5000";

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 20,
    height: "90vh",
    [theme.breakpoints.up("sm")]: {
      borderRadius: 10,
    },
  },
  inputContainer: {
    marginTop: 10,
  },
  buttonContainer: {
    [theme.breakpoints.down("sm")]: {
      padding: "10px 0",
    },
    [theme.breakpoints.up("md")]: {
      padding: 10,
    },
  },
  submitButton: {
    borderColor: "#FE6B8B",
    color: "#FE6B8B",
  },
}));

const Chat = ({ location }) => {
  const [nickname, setNickname] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const classes = useStyles();

  React.useEffect(() => {
    const { nickname, chat } = queryString.parse(location.search);

    socket = io(EndPoint);

    setNickname(nickname);

    socket.emit("join", { nickname, chat }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [EndPoint, location.search]);

  React.useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const onMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
      setMessage("");
    }
  };

  const onEnterPress = (e) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  return (
    <AppContainer>
      <Grid item xs={12} sm={9} md={6} className={classes.chatContainer}>
        <div>
          <Messages messages={messages} nickname={nickname} />
        </div>
        <div>
          <Grid container>
            <Grid item xs={12} md={8} className={classes.inputContainer}>
              <Input
                autoFocus
                fullWidth
                placeholder="Enter a message"
                value={message}
                type="text"
                onChange={onMessageChange}
                onKeyPress={onEnterPress}
                color="secondary"
              />
            </Grid>
            <Grid item xs={12} md={4} className={classes.buttonContainer}>
              <Button
                variant="outlined"
                onClick={sendMessage}
                fullWidth
                className={classes.submitButton}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </AppContainer>
  );
};

export default Chat;
