const Furniture = require("../models/furniture");
const Room = require("../models/room");
const fs = require("fs");

module.exports.furnitureByCategory = async (req, res, next) => {
    const furniture = await Furniture.find().gt('size', 0).populate('room');
    const categoriesList = await Room.find();
    const categories = [...categoriesList, { "id": "myItems", "translation": "הפריטים שלי" }];
    res.render('furniture/index', { categories, furniture });
}

module.exports.furnitureByCategoryForEdit = async (req, res, next) => {
    const rooms = await Room.find().populate('furniture');
    res.render('furniture/edit', { rooms });
}


module.exports.furnitureByCategoryForMobile = async (req, res, next) => {
    // const furniture = await Furniture.find();
    const roomsList = await Room.find().populate('furniture');
    const rooms = [...roomsList];
    res.render('furniture/indexmobile', { rooms });
}

module.exports.createNewFurniture = async (req, res, next) => {
    const furniture = new Furniture(req.body.furniture);
    furniture.image = req.file.path;
    await furniture.save();
    const furnRoom = await Room.findById(req.body.furniture.room);
    furnRoom.furniture.push(furniture._id);
    await furnRoom.save();
    req.flash('success', 'נוצר פריט חדש בהצלחה');
    res.redirect(`/edit`);
}

module.exports.createNewRoom = async (req, res, next) => {
    const room = new Room(req.body.room);
    await room.save();
    req.flash('success', 'נוצר חדר חדש בהצלחה');
    res.redirect(`/edit`);
}

module.exports.deleteFurniture = async (req, res, next) => {
    const { id, roomid } = req.params;
    await Room.findByIdAndUpdate(roomid, { $pull: { furniture: id } });
    await Furniture.findByIdAndDelete(id);
    req.flash('success', 'רהיט נמחק בהצלחה');
    res.redirect(`/edit`);
}


module.exports.deleteRoom = async (req, res, next) => {
    const { id } = req.params;
    await Room.findByIdAndDelete(id);
    req.flash('success', 'חדר נמחק בהצלחה');
    res.redirect(`/edit`);
}

module.exports.editFurniture = async (req, res, next) => {
    const { id } = req.params;
    const furniture = await Furniture.findByIdAndUpdate(id, { ...req.body.furniture });
    if (req.file) {
        images = [furniture.image, furniture.thumbnail];
        await deleteImages(images);
        furniture.image = req.file.path;
    }
    await furniture.save();
    req.flash('success', 'הפריט עודכן בהצלחה');
    res.redirect('/edit');
}

const deleteImages = async (images) => {
    images.forEach(img => {
        try {
            fs.unlinkSync(img);
        } catch (err) {
            console.log(err);
        }
    });
}