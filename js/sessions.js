"use strict";
// this libary will allow the server to create and manage sessions
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomString = generateRandomString;
exports.generateUniqueSessionId = generateUniqueSessionId;
exports.isValidSession = isValidSession;
function generateRandomString(length) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
}
function generateUniqueSessionId(sessions) {
    var length = 12;
    var newSessionId;
    do {
        newSessionId = generateRandomString(length);
    } while (sessions.includes(newSessionId));
    return newSessionId;
}
function isValidSession(session, sessions) {
    return session.includes(session);
}
