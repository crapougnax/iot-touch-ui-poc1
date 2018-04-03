import chalk from 'chalk'
import express from 'express'
import { readFileSync } from 'fs'
import { createServer } from 'http'
import createLogger from 'morgan'
import path from 'path'
import pug from 'pug'

import cartridgesController from './controllers/cartridges'
import mainController from './controllers/main'

const PORT = Number(process.env.PORT) || 3000

const app = express()
const publicPath = path.resolve(__dirname, '../public')

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(createLogger('dev'))

app.use((req, res, next) => {
  const { query, url } = req
  Object.assign(res.locals, {
    flash: [],
    query,
    url,
  })
  next()
})

app.use(express.static(publicPath))
app.locals.title = 'Poc Touch 1'

app.use(mainController)
app.use('/cartridges', cartridgesController)

const server = createServer(app)

server.listen(PORT, () => {
  console.log(chalk`{green ✔ Server listening on port} {cyan ${PORT}}`)
})
