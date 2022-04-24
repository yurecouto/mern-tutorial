const express = require('express')
const app = express()
const mongoose = require('mongoose')

// Middlewares
const cors = require('cors')
const User = require('./models/User')
app.use(cors())
app.use(express.json())

// Conecção com o Mongo
mongoose.connect('mongodb://localhost:2701/mern-tutorial')

app.post('/api/register', async (req, res) => {
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })    
        res.json({ status: 'ok' })
    } catch (error) {
        console.log(error)
        res.json({ status:'error', error:'duplicated user'})
    }
    /*
    if (user) {
        return res.json({status: 'ok', user: true})
    } else {
        return res.json({status: 'error', user: false})
    }*/

});

app.post('/api/login', async (req, res) => {
    try {
        await User.findOne({ email: req.body.email, password: req.body.password})
        res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: 'error', err: "Teste" })
    }
});

app.listen(1337, () =>{
    console.log('server connected');
});