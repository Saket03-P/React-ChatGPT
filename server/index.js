import express from 'express';
import axios from 'axios';
import expressAsyncHandler from 'express-async-handler';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()

const app= express();
app.use(express.json())
app.use(cors());

const PORT= 9090;
const OPENAI_API_KEY= process.env.OPENAI_API_KEY;

app.post('/completions', expressAsyncHandler(async (req, res) => {
    const options= {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'user',
                content: req.body.message
            }],
            max_tokens: 100,
        })
    };

    const response= await axios.post('https://api.openai.com/v1/chat/completions', options.body, {
        headers: options.headers
    });
    res.send(response.data);
}));

app.listen(PORT, () => console.log('ChatOOO running on ' + PORT))