const axios = require("axios");

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

module.exports.AiAssistant = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                error: "Message is required"
            })
        }

        const response = await axios.post(`https://openrouter.ai/api/v1/chat/completions`, {
            model: "openai/gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: message
                }
            ],
        },
            {
                headers: {
                    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        // const aiReply = response.data.choices[0].message.content;
        const aiReply = response.data.choices;

        res.status(200).json({
            success: true,
            reply: aiReply
        })

        console.log(aiReply)

        // const response = await axios.post(
        //     "https://openrouter.ai/api/v1/chat/completions",
        //     {
        //         model: "openai/gpt-4o-mini",
        //         messages: [
        //             {
        //                 role: "user",
        //                 content: userMessage
        //             }
        //         ],
        //         max_tokens: 1000
        //     },
        //     {
        //         headers: {
        //             Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        //             "Content-Type": "application/json"
        //         }
        //     }
        // );

        // const aiReply = response.data.choices[0].message.content;

        // res.status(200).json({
        //     success: true,
        //     reply: aiReply
        // });

    } catch (error) {
        console.error("Error in AiAssistant:", error.response?.data || error.message);

        res.status(500).json({
            success: false,
            error: "AI request failed",
            details: error.response?.data || error.message
        });
    }
};
