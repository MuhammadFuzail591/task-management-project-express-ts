import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(limiter)

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'API is running'
  })
})

export default app
