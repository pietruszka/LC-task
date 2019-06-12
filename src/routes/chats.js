const { Router } = require('express');
const chatsController = require('../controllers/chats');

const chatsRouter = new Router();
chatsRouter.get('/', chatsController.getAllChats);

module.exports = chatsRouter;
