const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/movieApp', { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('connection success!')
}).catch((err) => {
    console.log('error' + err);
})

const MovieSchema = new mongoose.Schema({
    title:String,
    year: Number,
    genre: String,
    rating: Number
});

const Movie = mongoose.model('Movie', MovieSchema)
const interstellar =  new Movie({title:'Interstellar', year:2018, genre:'Sci-Fi', rating:'10'})