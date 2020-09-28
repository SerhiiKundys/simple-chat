const { users } = require("../db/users");

const addUser = ({ id, nickname, chat }) => {
  nickname = nickname.trim().toLowerCase();
  chat = chat.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.chat === chat && user.nickname === nickname
  );

  if (!nickname || !chat) return { error: "Username and chat are required." };
  if (existingUser) return { error: "Username is taken." };

  const user = { id, nickname, chat };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInChat = (chat) => users.filter((user) => user.chat === chat);

module.exports = { addUser, removeUser, getUser, getUsersInChat };
