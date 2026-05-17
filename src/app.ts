import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import authRoutes from './routes/auth.routes.js'
import taskRoutes from './routes/task.routes.js'
import adminRoutes from './routes/admin.routes.js'
import accountRoutes from './routes/account.routes.js'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
const app = express()

const options = {
  definition:{
    openapi:'3.1.0',
    info:{
      title:"Task Management Project",
      version:"1.0.0"
    },
    components:{
      securitySchemes:{
        bearerAuth:{
          type:'http',
          scheme:'bearer',
          bearerFormat:'JWT',
        },
      },
    },
    security:[
      {
        bearerAuth:[],
      }
    ]
  },
  servers:[
    {
      url:"http://localhost:5000",
    }
  ],
  apis:['./src/routes/*.ts']
}

const swaggerSpec = swaggerJsdoc(options)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})
console.log(swaggerSpec)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(limiter)

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'API is running'
  })
})

app.use("/api/auth", authRoutes)

app.use("/api/task",taskRoutes);

app.use("/api/admin", adminRoutes)

app.use("/api/account",accountRoutes)

export default app
