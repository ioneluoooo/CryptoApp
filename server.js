import express from 'express'
import axios from 'axios'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors()) // Enable cors

app.get('/api/fetch-data', async(req, res) => {
    try {
        const response = await axios.get(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=INR&order=market_cap_desc&per_page=100&page=1&sparkline=false'
        )
        const data = response.data
        res.json(data)
        
    } catch (error) {
        res.status(500).json({error : 'Error internal server'})
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})