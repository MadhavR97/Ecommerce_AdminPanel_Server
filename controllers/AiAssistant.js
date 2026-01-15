const AiAssistant = require('../model/aiAssistant')

module.exports.AiAssistant = async (req, res) => {
    try {
        console.log(req.body)
    }
    catch (error) {
        console.error("Error in AiAssistant:", error);
    }
}