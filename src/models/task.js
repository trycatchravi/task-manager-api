const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},
    {
        timestamps: true
})


// const task = new Task({
//     name: 'Coding',
//     completed: true
// })

// task.save().then((task)=>{
//     console.log(task)
// }).catch((error)=>{
//     console.log(error)
// })

const Task = mongoose.model('Task', taskSchema)
module.exports = Task