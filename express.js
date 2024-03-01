const express = require('express')
const userJSON = require('./data/user.json')

const app = express()

app.disable('x-powered-by')

const PORT = process.env.PORT ?? '3000'

// Creando un middleware
app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  let body = ''

  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)

    data.timestamp = Date.now()

    req.body = data
    next()
  })
})

app.get('/', (req, res) => {
  res.status(200).send('<h1>Hello express!!</h1>')
})

app.get('/users/u001', (req, res) => {
  res.status(200).json(userJSON)
})

app.post('/users', (req, res) => {
  res.status(201).json(req.body)
})

// siempre se especifica la ruta default 404 al final de todas las rutas
app.use((req, res) => {
  res.status(404).send('<h1>404 - Not Found</h1>')
})

app.listen(PORT, () => {
  console.log(`server express listening on port http://localhost:${PORT}`)
})
