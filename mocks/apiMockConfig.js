const userMock = require('./userMock');
const messagesMock = require('./messagesMock');
// TODO: middleware validation ??, eslint

module.exports = [
  {
    pattern: `${process.env.CHAT_API_URL}/user/([0-9a-fA-F]{8}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{12})`,
    fixtures: (match, params, headers, context) => {
      context.delay = 300;
      return {
        userId: match[1],
      };
    },
    get: (match, data) => {
      const { userId } = data;
      return {
        status: 201,
        body: userMock.find(user => user.user_uuid === userId) || null,
      };
    },
  },
  {
    pattern: `${process.env.CHAT_API_URL}/messages`,
    fixtures: () => {},
    get: () => ({
      status: 201,
      body: messagesMock,
    }),
  },
  {
    pattern: `${process.env.CHAT_API_URL}(.*)`,
    fixtures: () => {
      throw new Error('CHAT_API_DOESNT_EXIST');
    },
    get: () => ({
      status: 404,
    }),
  },
];
