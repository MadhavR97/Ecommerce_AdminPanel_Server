const axios = require("axios");
const AiAssistantModel = require("../model/aiAssistant");

module.exports.AiAssistant = async (req, res) => {
    try {
        console.log(req.body);
    } catch (error) {
        console.error("Error in AiAssistant:", error.response?.data || error.message);
        res.status(500).json({ error: "AI request failed" });
    }
};