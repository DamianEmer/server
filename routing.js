const http = require('node:http')

const userJSON = require('./data/user.json')

const PORT = 3000

const handleRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/users/U001':
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(userJSON))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset:utf-8')
          return res.end('<h1>404 Not Found</h1>')
      }
    case 'POST':
      switch (url) {
        case '/users': {
          let body = ''

          req.on('data', chunk => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            // llamado a BD
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })

            data.timestamp = Date.now()

            res.end(JSON.stringify(data))
          })

          break
        }
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset:utf-8')
          return res.end('<h1>404 Not Found</h1>')
      }
  }
}

const server = http.createServer(handleRequest)

server.listen(PORT, () => {
  console.log(`Server routing at http://localhost:${PORT}`)
})
