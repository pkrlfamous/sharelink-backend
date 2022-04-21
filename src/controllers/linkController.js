const express = require("express");
const { Link } = require("../models");
const _ = require("lodash");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const mongoose = require("mongoose");

module.exports = {
  getALink: catchAsync(async (req, res, next) => {
    // if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send("invalid id");
    const link = await Link.findById(req.params.id);
    if (!link) {
      return next(new AppError("Link with the given id not found", 404));
    }
    res.status(200).send(link);
  }),
  getLinks: catchAsync(async (req, res, next) => {
    const links = await Link.find({}, { __v: 0 }).sort("title");
    res.send(links);
  }),
  createLink: catchAsync(async (req, res, next) => {
    let link = new Link(
      _.pick(req.body, ["name", "url", "parentLink", "createdBy", "tag"])
    );
    await link.save();
    res.send(link);
  }),
  updateLink: catchAsync(async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send("invalid url");
    const link = await Link.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        url: req.body.url,
        parentLink: req.body.parentLink,
        createdBy: req.body.createdBy,
        description: req.body.description,
        tag: req.body.tag,
      },
      { new: true }
    );
    if (!link) return res.status(404).send("link not found");
    res.send(link);
  }),
  deleteLink: catchAsync(async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(404).send("invalid url");
    const link = await Link.findByIdAndRemove(req.params.id);
    if (!link) return res.status(404).send("link not found");
    res.send(link);
  }),
};
