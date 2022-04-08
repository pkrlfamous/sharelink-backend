const express = require('express');
const {Link} = require('../models');
const _ = require('lodash');

module.exports = {
    getALink: async(req, res, next)=>{
        const link = await Link.findById(req.params);
        if(!link) return res.status(404).send('link not found');
        res.status(200).send(link);
    },
    getLinks: async(req, res, next)=>{
        const links = await Link.find({},{__v:0}).sort('title');
        res.send(links)
    },
    createLink: async(req, res, next) =>{
        let link = new Link(_.pick(req.body, ['name', 'url', 'parentLink', 'createdBy', 'tag']));
        await link.save();
        res.send(link);
    },
    updateLink: async(req, res, next)=>{

        const link = await Link.findByIdAndUpdate(req.params.id,
            {
                title:req.body.title,
                url:req.body.url,
                parentLink:req.body.parentLink,
                createdBy:req.body.createdBy,
                description:req.body.description,
                tag:req.body.tag
            }, {new:true});
        if(!link) return res.status(404).send('link not found');
    },
    deleteLink: async(req, res, next)=>{
        const link = await Link.findByIdAndRemove(req.params.id);
        if(!link) return res.status(404).send('link not found');
        res.send(link);
    },
}