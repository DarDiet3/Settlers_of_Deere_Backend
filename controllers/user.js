const User = require("../models").User;
const Profile = require("../models").UserProfile;

const constants = require("../constants");

const getUserData = (req, res) => {
    User.findByPk(req.user.id, {
        include: [
            {
                model: Profile
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
module.exports = {
    getUserData
}