const mongoose = require("mongoose");

const AiAssistantSchema = new mongoose.Schema({
    userMessage: {
        type: String,
        required: true,
    },
    aiResponse: {
        type: String,
        required: true,
    }
}, { timestamps: true }
);

module.exports = mongoose.model("AiAssistant", AiAssistantSchema);