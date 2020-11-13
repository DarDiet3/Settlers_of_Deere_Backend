const User = require("../models").User;
const Profile = require("../models").UserProfile;

const constants = require("../constants");

const getUserProfData = (req, res) => {
    console.log(req.params)
    User.findByPk(req.params.id, {
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
        console.log(err)
        res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
    })
}
module.exports = {
    getUserProfData
}