const { expect } = require('chai');
const chatService = require('../chatService.js');
const messagesMock = require('../../../mocks/messagesMock.js');

describe('chatService', function() {
    describe('parseUser()', function() {
        it('author object is parsed into string', function() {
            const userObject = {
                "user_uuid": "ba405586-3a7f-484b-b5c0-5d1cf5cd9c0e",
                "first_name": "John",
                "last_name": "Doe"
            };
            const result = chatService.parseUser(userObject);
            expect(result).to.be.equal(`${userObject.first_name} ${userObject.last_name}`);
        });
        it('if author doesnt exist return \'Anonymous\'' , function() {
            const userObject = null;
            const result = chatService.parseUser(userObject);
            expect(result).to.be.equal('Anonymous')
        })
    });
    describe('matchUser()', function() {
        it('if author doesnt exist return \'Anonymous\'' , function() {
            const messageObject = {
                "message_uuid": "ed557979-5007-4d2c-a3ab-1d58b5603b83",
                "chat_uuid": "c4ad5026-b85c-45fa-8670-82af54623aab",
                "author_uuid": "ce0d0300-716b-4ba8-8f2f-d01d1c2576a4",
                "text": "See you later!"
            };
            const result = chatService.matchUser(messageObject, []);
            expect(result).to.be.equal('Anonymous')
        })
    });
    describe('matchChatsWithMessagesAndAuthors()', function() {
        it('if many messages of particular author exist in chatroom' , function() {
            const authorList = [
                {
                    author_uuid: 'ba405586-3a7f-484b-b5c0-5d1cf5cd9c0e',
                    content: {
                        user_uuid: 'ba405586-3a7f-484b-b5c0-5d1cf5cd9c0e',
                        first_name: 'John',
                        last_name: 'Doe'
                    }
                },
                {
                    author_uuid: '3017eb96-a211-417b-ab96-6d7286cc0d5c',
                    content: {
                        user_uuid: '3017eb96-a211-417b-ab96-6d7286cc0d5c',
                        first_name: 'John',
                        last_name: 'Doe'
                    }
                },
                {
                    author_uuid: '3017eb96-a211-417b-ab96-6d7286cc0d5c',
                    content: null
                }
            ];

            const result = chatService.matchChatsWithMessagesAndAuthors(messagesMock, authorList);

            const expectedResult = [
                {
                    "chat_uuid": "802e9b88-60f2-43a1-b8b9-bad33afb0f7b",
                    "messages_count": 3,
                    "users": [
                        "John Doe",
                    ]
                },
                {
                    "chat_uuid": "c4ad5026-b85c-45fa-8670-82af54623aab",
                    "messages_count": 1,
                    "users": [
                        "Anonymous"
                    ]
                }
            ];

            expect(result).to.deep.equal(expectedResult);
        })
    });
});
