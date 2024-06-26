const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    id: String,
    content: {
        type: String,
        required: true
    },
    user: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ,
    important: Boolean
})
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('Note', noteSchema);