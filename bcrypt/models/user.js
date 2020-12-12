const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, 'Username cannot be blank']
    },
    password:{
        type:String,
        required:[true, 'Password cannot be blank']
    }
})


//use static methods when your not instantiating the obj
//"The statics object contains functions that are associated with the model itself, and not the individual instances."
userSchema.statics.findAndValidate = async function(username, password){
    try {
        const foundUser = await this.findOne({username})
        const isValid = await bcrypt.compare(password, foundUser.password);
        return isValid ? foundUser : false;
    }catch{
        return false;
    }
}

module.exports = mongoose.model('User', userSchema);