const express = require('express')
const mongoose = require('mongoose')
const Todo = require('./models/Todo')
const bodyParser = require('body-parser');
const cors = require('cors')
const todoRoutes = express.Router();

const PORT = 3003
const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(todoRoutes)

async function start() {
    try {
        await mongoose.connect(
            'mongodb+srv://anton:anton@cluster0.iruqf.mongodb.net/todos?retryWrites=true&w=majority', {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            }
        )
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
    console.log(req.body);
    let todo = Todo.create({title: req.body.data.title})
    .then((todo) => {
        console.log(todo);
        res.status(200).json(todo);
    })
    .catch(err => {
        res.status(400).send('adding new Todo failed');
    });
});

todoRoutes.route('/:id').delete(function(req, res) {
    Todo.findByIdAndDelete (req.params.id)
    .then(() => res.json({remove:true}))
})

todoRoutes.route('/:id').patch(function(req, res) {
    Todo.findByIdAndUpdate(req.params.id, {...req.body.data})
    .then((todo) => res.send('success'))
    .catch((error) => res.send(error))
    // Todo.updateMany(req.params.id, {...req.body.data})
    // .then((todo) => res.send('success'))
    // .catch((error) => res.send(error))
})
