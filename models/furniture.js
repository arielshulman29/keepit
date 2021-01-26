const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const opts = { toJSON: { virtuals: true } };

const furnitureSchema = new Schema({
    title: String,
    translation: String,
    image: String,
    size: Number,
    price: Number,
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room'
    }
},opts);
furnitureSchema.virtual('thumbnail').get(function () {
    return this.image.replace('uploads/','uploads/thumb-');
});


module.exports = mongoose.model("Furniture", furnitureSchema);