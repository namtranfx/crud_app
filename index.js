const express = require('express');
const productRoute = require('./routes/product.route.js');
const userRoute = require('./routes/user.route.js');
const port = 3000

const app = express()

// Add middleware
app.use(express.json())

// Route
app.use('/api/product', productRoute);
app.use('/api/user', userRoute);

// GET API
app.get('/', (req, res) => {
  res.send('Welcome to my project!')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

