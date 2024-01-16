import express from 'express'
import mongoose from 'mongoose'
import todoRouter from './routes/todoRouter.js'
import dotenv from 'dotenv'
import cors from 'cors'
import http from 'http'

const app = express()
const PORT = process.env.PORT || 8000
const bodyParserJson = express.json()

dotenv.config()
app.use(bodyParserJson)
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL
	})
)
app.use('/todo', todoRouter)

const server = http.createServer(app)

const startServer = async () => {
	try {
		await mongoose.connect(process.env.DB_ACCESS)
		server.listen(PORT, () => {
			console.log(`Server started on port ${PORT}`)
		})
	} catch (e) {
		console.log('error: ', e)
	}
}

startServer()
