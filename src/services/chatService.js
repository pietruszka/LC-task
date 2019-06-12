const _ = require('lodash');

const matchUser = (message, authors) => {
  const foundAuthor = authors.find(author => author.author_uuid === message.author_uuid);

  if (!foundAuthor) return parseUser(foundAuthor);
  return parseUser(foundAuthor.content);
};

const matchChatsWithMessagesAndAuthors = (messages = [], authors = []) => {
  const result = messages.reduce((acc, message) => {
    if (!acc[message.chat_uuid]) {
      acc[message.chat_uuid] = {
        chat_uuid: message.chat_uuid,
        messages_count: 1,
        users: [matchUser(message, authors)],
      };
    } else {
      acc[message.chat_uuid] = {
        chat_uuid: message.chat_uuid,
        messages_count: acc[message.chat_uuid].messages_count + 1,
        users: _.uniq([...acc[message.chat_uuid].users, matchUser(message, authors)]),
      };
    }
    return acc;
  }, {});
  return Object.values(result);
};

const parseUser = context => (context ? `${context.first_name} ${context.last_name}` : 'Anonymous');

module.exports = {
  matchChatsWithMessagesAndAuthors,
  parseUser,
  matchUser,
};
