const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Furniture=require('./furniture');
const opts = { toJSON: { virtuals: true } };

const RoomSchema = new Schema({
    category: String,
    translation: String,
    furniture: [{
        type: Schema.Types.ObjectId,
        ref: 'Furniture'
    }]
},opts)

RoomSchema.post('findOneAndDelete', async function (doc) {
    if(doc){
        await Furniture.remove({
            _id: {
                $in: doc.furniture
            }
        })
    }
});

module.exports = mongoose.model("Room", RoomSchema);