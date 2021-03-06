const express = require('express') 
const { model, models } = require('mongoose')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/tasks', auth, async(req,res)=>{
    //const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(error){
        res.status(400).send(error)
    }
    // task.save().then(()=>{
    //     res.status(201).send(task)
    // }).catch((error)=>{
    //     res.status(400).send(error)
    // })
})

router.get('/tasks', auth, async (req,res) => {
    const select = {} 
    const sort = {}
    if(req.query.completed){
        select.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try{
        //const tasks = await Task.find({owner: req.user._id})
        //res.send(tasks)
         await req.user.populate([{
             path:'tasks',
             select,
             options: {
                 limit: parseInt(req.query.limit),
                 skip:  parseInt(req.query.skip),
                 sort
             }
        }])
        res.send(req.user.tasks)
    }
    catch(error){
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req,res) => {
    const _id = req.params.id
    try{
        //const task = await Task.findById(_id)
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    }
    catch(error){
        res.status(500).send()
    }
})


router.patch('/tasks/:id', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['name','completed']
    const isUpdationAllowed = updates.every((update)=> allowedUpdate.includes(update))

    if(!isUpdationAllowed) {
        return res.status(404).send({error:'Invalid updates!'})
    }

    const _id = req.params.id
    try{
        // this way of updation gona bypass mongoose midlware
       //const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators:true})
       
       const task = await Task.findOne({_id:req.params.id, owner:req.user._id})
       //const task = await Task.findById(req.params.id)

       if(!task){
           return res.status(400).send()
       }

       updates.forEach((update)=> task[update]=req.body[update])
       await task.save()
       res.status(201).send(task)
    }
    catch(error){
        res.status(500).send(error)
    }
})


router.delete('/tasks/:id', auth, async (req,res) => {
    try { 
        const task = await Task.findByIdAndDelete({_id:req.params.id, owner:req.user._id})
        if(!task){
            return res.status(400).send()
        }
        res.send(task)
    }
    catch(error){
        res.status(500).send(error)
    }
})


module.exports = router