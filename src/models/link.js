const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
    },
    parentLink: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link",
      default: null,
    },
    childLink: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link",
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
    },
    tag: {
      type: Array,
    },
  },
  { timestamps: true }
);

const linkList = new mongoose.Schema({});

const Link = mongoose.model("Link", linkSchema);
module.exports = Link;
