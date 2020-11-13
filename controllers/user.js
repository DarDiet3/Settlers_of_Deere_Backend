const User = require("../models").User;
const Profile = require("../models").Profile;

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

const deleteUser = (req, res) => {
    User.destroy({
        wehre: {id: req.params.id}
    })
    .then(() => {
        Profile.destroy({
            where: {id: req.params.id}
        })
    })
    .then(() => {
        res.clearCookie("jwt");
    })
}

module.exports = {
    getUserData,
    editUser,
    deleteUser
}