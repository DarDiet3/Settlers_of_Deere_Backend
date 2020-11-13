const User = require("../models").User;
const Profile = require("../models").UserProfile;

const constants = require("../constants");

const getUserData = (req, res) => {
    console.log(req.body)
    User.findByPk(req.user.id, {
        include: [
            {
                model: Profile,
                as: "userProfile"
            }
        ]
    })
    .then(userData => {
        res.status(constants.SUCCESS).json(userData)
    })
    .catch(err => {
        res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
    })
}

const editUser = (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        },
        returning: true
    })
    .catch(err => {
        res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
    })
}

module.exports = {
    getUserData,
    editUser
}