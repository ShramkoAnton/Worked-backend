const {Schema, model} = require('mongoose')

const Todo = new Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Todo', Todo)