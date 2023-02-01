import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const companySchema = mongoose.Schema({
    
}, {
    timestamps: true
})

companySchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

//encrypt password before creating new company
companySchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const Company = mongoose.model('Company', companySchema)

export default Company