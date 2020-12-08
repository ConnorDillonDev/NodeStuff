const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/movieApp', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('connection success!')
    }).catch((err) => {
    console.log('error' + err);
})

const MovieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    genre: String,
    rating: Number
});

const Movie = mongoose.model('Movie', MovieSchema)
// const interstellar =  new Movie({title:'Interstellar', year:2018, genre:'Sci-Fi', rating:'10'})

//insert
Movie.insertMany([
    {title: 'Interstellar', year: 2018, genre: 'Sci-Fi', rating: '10'},
    {title: 'IT', year: 2019, genre: 'Horror', rating: '9'},
    {title: 'Tennet', year: 2021, genre: 'Action', rating: '3'}
]).then(() => {
    console.log('inserted movies')
}).catch((err) => {
    console.log('error on insertMany\n' + err)
})
//update
// Movie.updateMany({title: {$in:['IT', 'Tennet']}}, {rating: 9});

//find and update
//return updated version {new:true}
Movie.findOneAndUpdate({title:'Tennet'}, {score:2}, {new:true}).then((m)=>{
    console.log('updated')
    console.log(m);
});

//delete
Movie.remove({title:'Tennet'}).then((data)=>{
    console.log('removed')
    console.log(data);
})