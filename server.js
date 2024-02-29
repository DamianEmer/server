const http = require('node:http')
const fs = require('node:fs')

// const hostname = '127.0.0.1';
const hostname = 'localhost'
const port = 3000

const handleRequest = (req, res) => {
  // console.log('Received req: ', req.url)

  res.setHeader('Content-Type', 'text/plain; charset=utf-8')

  if (req.url === '/') {
    res.statusCode = 200 // Default cuando todo esta ok
    res.end('Bienvenido a mi página de inicio!\n')
  } else if (req.url === '/imagen-test.png') {
    fs.readFile('./test.png', (error, data) => {
      if (error) {
        res.statusCode = 500
        res.end('<h1>500 Internal Server Error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  }
}

const server = http.createServer(handleRequest)

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

/**
 * Para iniciar el server y detectar cambios en tiempo real podemos hacer uso de la bandera --watch en el comando, es decir,
 * node --watch sever.js
 */
