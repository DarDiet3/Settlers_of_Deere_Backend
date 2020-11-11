require("dotenv").config;

const User = require('../models').User;
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const constants = require("../constants");


const signUp = (req,res) => {
    // ToDo: add code for having default profile image and no image
    bcrypt.genSalt(10, (err,salt) => {
        if(err) {
            res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
        }
        bcrypt.hash(req.body.password, salt, (err, hashedPwd) => {
            if(err){
                res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
            }
            req.body.password = hashedPwd;

            User.create(req.body)
            .then(newUser => {
                const token = jwt.sign(
                    {
                        username: newUser.username,
                        id: newUser.id
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1 day"
                    }
                );

                res.status(constants.SUCCESS).json({
                    "token": token,
                    "user": newUser
                });
            })
            .catch(err => {
                res.status(constants.BAD_REQUEST).end(`ERROR: ${err}`);
            })
        })
    })
}

const login = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(foundUser => {
        if(foundUser){
            bcrypt.compare(req.body.password, foundUser.password, (err, match) => {
                if(match){
                    const token = jwt.sign(
                        {
                            username: foundUser.username,
                            id: foundUser.id
                        },
                        process.nextTick.JWT_SECRET,
                        {
                            expiresIn: "1 day"
                        }
                    )
                    res.status(constants.SUCCESS).json({
                        "token": token,
                        "user": foundUser
                    });
                } else {
                    res.status(constants.BAD_REQUEST).send(`ERROR: Incorrect USername/Password`);
                }
            })
        } else {
            res.status(constants.BAD_REQUEST).send(`ERROR: Incorrect Username/Passord`);
        }
    })
    .catch(err => {
        res.statsu(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
    })
}

const verifyUser = (req,res) => {
    User.findByPk(req.user.id, {
        attricutes: ["id", "username", "email"]
    })
    .then(foundUser => {
        res.status(constants.SUCCESS).json(foundUser);
    })
    .catch(err => {
        res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`)
    })
}

module.exports = {
    signUp,
    login,
    verifyUser

}