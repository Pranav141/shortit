const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UrlSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  originalUrl: {
    type: String,
    required: true,
  },
  analytics:[
      {
        date: {
          type: String,
          required: true,
        },
        visits: {
          type: Number,
          required: true,
        }
      }
    ]
  ,
  totalVisits:{
    type:Number,
    default:0
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
  isEnabled: {
    type: Boolean,
    default: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Url = mongoose.model("Url", UrlSchema);
module.exports = Url;
