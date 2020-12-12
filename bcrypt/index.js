const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const app = express();

const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost:27017/Auth', {useNewUrlParser:true})
    .then(()=> {
        console.log('open')
    }).catch((e) =>{
        console.log(e)
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username})
    const validUser = await bcrypt.compare(password, user.password)
    if(validUser){
        res.send('Welcome')
    }else{
        res.send('try again')
    }
})

app.get('/', (req, res) => {
    res.send('this is the homepage')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const {username, password} = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password: hash
    })
    await user.save();
    res.redirect('/');
})

app.get('/secret', (req, res) => {
    res.send('secrete')
});

app.listen(3000, ()=>{
    console.log('SERVING on 3000')
})