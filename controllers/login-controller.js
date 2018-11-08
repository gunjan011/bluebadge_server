var router = require('express').Router();
var Sequelize = require('../db');
var User = Sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/', function (req, res) {
    User.findOne({ where: { username: req.body.user.username } })
        .then(
            function (user) {
                if (user) {
                    bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
                        console.log("the value matches", matches)
                        if (matches) {
                            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                            res.json({
                                user: user,
                                message: "you logged in",
                                sessionToken: token
                            });
                        } else {
                            res.status(502).send({ error: "failed to authenticate" });
                        }
                    })
                } else {
                    res.status(500).send({ error: "server error" })
                }
            },
            function (err) {
                res.status(501).send({ error: "even bigger server error" })
            })
})

module.exports = router;