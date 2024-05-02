const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    user : {
        type : String,
        required: true,
    },
    message : {
        type : String,
        required : true,
    },
})

const Chat = mongoose.model("Chats_Collections",ChatSchema);

module.exports = Chat;
