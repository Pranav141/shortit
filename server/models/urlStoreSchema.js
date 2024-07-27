const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UrlStoreSchema = new Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  clickCount: {
    type: Number,
    default: 0, 
  },
  hashedUrl: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  expiresIn: {
    type: Date,
    required: true,
  },
});
UrlStoreSchema.index({expiresIn:1},{expireAfterSeconds:0})
const UrlStore = mongoose.model("UrlStore", UrlStoreSchema);
module.exports = UrlStore;
