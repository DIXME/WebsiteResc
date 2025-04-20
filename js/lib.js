"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = createMessage;
exports.readMessage = readMessage;
// this libbary will just allow a type and data to be parsed and stringfied in a 
// more readable manner so the server and the client can cummunacate more effectivley
// beacuse websockets (cummoncation method) can only send strings
// even if this also i feel just makes this entire procces more readable
function createMessage(type, data) {
    // @param type this is the type of event that can be used to identify the message
    // @param data this is an object that can store any kind of data
    return JSON.stringify({
        type: type,
        data: data
    });
}
function readMessage(message) {
    // @param message this should be stringifed version of a message
    return JSON.parse(message);
}
