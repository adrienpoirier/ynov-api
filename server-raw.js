import http from 'http'

const server = http.createServer((request, response) => {
  if (request.url === '/api/products' && request.method === 'GET'){
    response.writeHead(200, {'Content-type' : 'application/json'})
    response.end(JSON.stringify({
      id : 1
    }))
  }
  else{
    response.writeHead(404, {'Content-type' : 'application/json'})
    response.end(JSON.stringify({
      message: "route not found"
    }))
  }
  console.log(request)
  response.end()
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log('server running'))
