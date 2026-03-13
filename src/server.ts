import 'dotenv/config'
import app from './app.js'
import { prisma } from './config/prisma.js'

const PORT = process.env.PORT || 5000

async function testDB () {
  const users = await prisma.user.findMany()
  console.log(users)
}

testDB()

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
