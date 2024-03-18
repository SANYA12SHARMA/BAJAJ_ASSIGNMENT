import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const USERID = "sanya_sharma_01122003";
const EMAIL = "sanya6018.be21@chitkara.edu.in";
const ROLLNUMBER = "2110996018";
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send("API is working"); 
});

app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, error: "Invalid data provided" });
    }

    try {
        
        const numbers = data.filter(item => typeof item === 'string' && !isNaN(item));
        const alphabets = data.filter(item => typeof item === 'string' && item.length === 1 && /[a-zA-Z]/.test(item));


        const response = {
            is_success: true,
            user_id: USERID,
            email: EMAIL,
            roll_number: ROLLNUMBER,
            odd_numbers: numbers.filter(item => parseInt(item) % 2 !== 0),
            even_numbers: numbers.filter(item => parseInt(item) % 2 === 0),
            alphabets: alphabets.map(item => item.toUpperCase())
        };

        res.json(response);
    } catch (error) {
        res.status(500).json({ is_success: false, message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
