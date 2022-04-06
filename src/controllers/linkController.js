const express = require('express');
const {Link} = require('../models');
const _ = require('lodash');

module.exports = {
    createLink: async(req, res, next) =>{
        let link = new Link(_.pick(req.body, ['name', 'url', 'parentLink', 'createdBy', 'tag']));
        await link.save();
        res.send(link);
    }
}