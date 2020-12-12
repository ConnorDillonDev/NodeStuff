const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const session = require('express-session')
const app = express();


const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/Auth', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('open')
    }).catch((e) => {
    console.log(e)
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}));
app.use(session({secret: 'notagoodsecret'}))

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login')
    }
    next();
}

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const foundUser = await User.findAndValidate(username, password)
    if (foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect('secret')
    } else {
        res.send('try again')
    }
})

app.post('/logout', (req, res) => {
    console.log(req.session)
    req.session.user_id = null;
    // req.session.destroy();
    res.redirect('/login')
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
    req.session.user_id = user.id;
    console.log(req.session);
    res.redirect('/login');
})

app.get('/secret', requireLogin, (req, res) => {
    res.render('secret')
});

app.listen(3000, () => {
    console.log('SERVING on 3000')
})