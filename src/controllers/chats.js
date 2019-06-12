const _ = require('lodash');
const asyncUtils = require('../utils/asyncUtils');
const { fetchMessageList, fetchUserById } = require('../services/apiService');
const chatService = require('../services/chatService');

const fetchSingleAuthor = async authorUuid => ({ author_uuid: authorUuid, content: await fetchUserById(authorUuid) });

const getAllChats = async (req, res) => {
  try {
    const messages = await fetchMessageList();
    const authors = _.uniq(messages.map(message => message.author_uuid));
    const fetchedAuthors = await asyncUtils.processArray(authors, fetchSingleAuthor);

    res
      .status(200)
      .json(chatService.matchChatsWithMessagesAndAuthors(messages, fetchedAuthors));
  } catch (err) {
    res
      .status(500)
      .send(err.message);
  }
};

module.exports = {
  getAllChats,
};
