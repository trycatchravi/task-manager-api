const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT

const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.endsWith('.pdf'))  // file.originalname.match(/\.(doc|docx)$/)  <-- follow this for word doc type document
        {
            cb(new Error('File must be a pdf'))
        }
        cb(undefined,true)
    }
})

app.post('/upload', upload.single('upload'), (req,res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error:error.message})
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


const Task = require('./models/task')
const User = require('./models/user')

const main = async () => {
    try {  
        const task = await Task.findById('6148e4beca8f12eab046e8e5')
        await task.populate('owner')
        console.log(task.owner)

        // const user = await User.findById('6148e374b83efae4107603c5')
        // await user.populate('tasks').exec()
        // console.log(user.tasks)
    } catch (error) {
        
    }
}

main()
// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' },  process.env.JWT_SECRET, { expiresIn: '7 days' })
//     console.log(token)

//     const data = jwt.verify(token,  process.env.JWT_SECRET)
//     console.log(data)
// }

// myFunction()