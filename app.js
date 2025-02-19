const express = require('express')
const api = require('./api')
const middleware = require('./middleware')
const bodyParser = require('body-parser')

// Set the port for the server
const port = process.env.PORT || 3000

// Initialize the Express app
const app = express()

// Serve static files from the public directory
app.use(express.static(__dirname + '/public'))

// Register middleware to parse JSON bodies
app.use(bodyParser.json())

// Apply custom CORS middleware
app.use(middleware.cors)

// Define the root route
app.get('/', api.handleRoot)

// Define routes for managing products
app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.put('/products/:id', api.editProduct)
app.delete('/products/:id', api.deleteProduct)
app.post('/products', api.createProduct)

// Define routes for managing orders
app.get('/orders', api.listOrders)
app.post('/orders/', api.createOrder)
app.put('/orders/:id', api.editOrder)
app.delete('/orders/:id', api.deleteOrder)

// Start the server and listen on the defined port
app.listen(port, () => console.log(`Server listening on port ${port}`))
