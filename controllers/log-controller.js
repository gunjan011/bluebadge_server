const router = require('express').Router();
const validateSession = require('../middleware/validate-session');
const Log = require('../db').import('../models/log');
 //Log.sync({force: true});

//Compose new poem
router.post('/', validateSession, (req, res) => {
    if(!req.error) {
        let caption = req.body.log.caption;
        let compose = req.body.log.compose;
        let ownerId = req.user.id;
        Log
        .create({
            caption: caption,
            compose: compose,
            ownerId: ownerId,

        })
        .then(function(log) {
            console.log("post success")
            res.send(log);
        },
        function(err) {
            console.log(err);
        }
        )} else {
            res.status(500).json(error)
        }
});

//get all poems

router.get('/', validateSession, (req, res) => {
     Log.findAll({where: {
         ownerId: req.user.id
     }})
     .then(log => res.status(200).json({log}))
     .catch(error => res.status(500).json(error))
});
// get poems by id
router.get('/:id', (req, res) => {
    Log.findOne({where: { id: req.params.id}})
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({error: err}))
})

//update poem by id
router.put('/:id',(req, res) => {
    console.log(req.params);
    if(!req.errors) {
        Log.update({caption: req.body.log.caption, compose:req.body.log.compose},
            {where: {id: req.params.id}})
            .then(log => res.status(200).json(log))
            .catch(err => res.status(500).json(req.errors))
    } else {
        res.status(500).json(req.errors)
    }
})
//delete poem by id
router.delete('/:id', (req, res) => {
    if(!req.errors) {
        Log.destroy({where: {id: req.params.id}})
        .then(log => res.status(200).json(log))
        .catch(err => res.json(req.errors))
    } else {
        res.status(500).json(req.errors)
    }
})
module.exports = router;