const express = require('express');
const chatsRouter = require('./src/routes/chats');

const app = express();

app.use('/chats', chatsRouter);

app.listen(process.env.PORT, () => console.log(`Server is listen on port: ${process.env.PORT}`));

module.exports = app;
