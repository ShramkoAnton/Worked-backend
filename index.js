const express = require('express')
const mongoose = require('mongoose')
const Todo = require('./models/Todo')
const bodyParser = require('body-parser');
const cors = require('cors')
// const todoRoutes = require('./routes/todos') 
const todoRoutes = express.Router();

const PORT = 3003

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
            console.log("server has been started on port 3003");   
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

todoRoutes.route('/').post(function (req, res) {
    
    let todo = new Todo({title: req.body.title});
    
    console.log([todo.title, todo.completed, todo.id]);

    todo.save()
        .then((todo) => {
            res.status(200).json({ 'Todo': 'todo added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new Todo failed');
        });
});

todoRoutes.route('/id').delete(function(req, res) {

    let todo = new Todo({_id: req.body.id});

    todo.remove()
    .then(() => {
        res.status(200).json({ 'Todo': 'todo deleted' });
    })
    .catch(err => {
        res.status(400).send('deleted Todo failed');
    });
})

// todoRoutes.route('/').patch(function(req, res) {

//     let todo = new Todo({completed: req.body.completed});

//     todo.updateOne()
//     .then((todo) => {
//         res.status(200).json({ 'Todo': 'todo update' });
//     })
//     .catch(err => {
//         res.status(400).send('updated Todo failed');
//     });
// })

// todoRoutes.route('/:id').get(function (req, res) {
//     let id = req.params.id;
//     Todo.findById(id, function (err, todo) {
//          res.json(todo);
//     });
// });

