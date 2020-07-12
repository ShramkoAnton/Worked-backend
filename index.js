const express = require('express')
const mongoose = require('mongoose')
const Todo = require('./models/Todo')
const todoRoutes = require('./routes/todos') 

const PORT = process.env.PORT || 3001

const app = express()

app.use(todoRoutes)

async function start() {
    try {
        await mongoose.connect('mongodb+srv://anton:anton@cluster0.iruqf.mongodb.net/todos', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log("server has been started");   
        })
    } catch (e) {
        console.log(e);
        
    }
}
app.post('/notes', (req, res) => {
    // Здесь будем создавать заметку.
    res.send('Hello')
  });
start()