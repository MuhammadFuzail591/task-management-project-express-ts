import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'


const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'API is running'
  })
})

export default app
