const express = require('express')
const mongoose = require('mongoose')
const Todo = require('./models/Todo')
const bodyParser = require('body-parser');
const cors = require('cors')
// const todoRoutes = require('./routes/todos') 
const todoRoutes = express.Router();

const PORT = 3002

const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(todoRoutes)

async function start() {
    try {
        await mongoose.connect('mongodb+srv://anton:anton@cluster0.iruqf.mongodb.net/todos?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        
        app.listen(PORT, () => {
            console.log("server has been started on port 3002");   
        })
        
    } catch (e) {
        console.log(e);
        
    }
}
start()

todoRoutes.route('/').get(function (req, res) {
    Todo.find({}, function (err, notes) {
         if (err) {
              console.log(err);
         } else {
              res.json(notes);
         }
    });
});

todoRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Todo.findById(id, function (err, todo) {
         res.json(todo);
    });
});

todoRoutes.route('/add').post(function (req, res) {
    let todo = new Todo({title: req.body.title});
    console.log(req.body.title);
    
    console.log(todo.title);
    console.log(todo.completed);
    console.log(todo.id);
    
    todo.save()
         .then((todo) => {
              res.status(200).json({ 'Todo': 'todo added successfully' });
            })
         .catch(err => {
              res.status(400).send('adding new Todo failed');
            });
});
// app.post('/', async (req, res) => {
//     const Todo = new Todo({ title: req.body.title});
//     try {
//         await Todo.save();
//         res.redirect("/");
//     } catch (err) {
//         res.redirect("/");
//     }
// });