const request = require('superagent');
const mockedRequest = require('superagent-mock');
const apiMockConfig = require('../../mocks/apiMockConfig');

const mockApiLogger = log => console.log(`ChatApi Log: ${log.method} ${log.url}`);

const sendChatApiRequest = (url = '') => new Promise(((resolve, reject) => {
  if (process.env.NODE_ENV === 'development') {
    mockedRequest(request, apiMockConfig, mockApiLogger);
  }

  request
    .get(process.env.CHAT_API_URL + url)
    .end((err, result) => {
      if (err) return reject(err);

      return resolve(result.body);
    });
}));

const fetchMessageList = () => sendChatApiRequest('/messages');

const fetchUserById = userId => sendChatApiRequest(`/user/${userId}`);

module.exports = {
  fetchMessageList,
  fetchUserById,
};
