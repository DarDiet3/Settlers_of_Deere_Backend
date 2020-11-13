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

const editProfile = (req, res) => {
    Profile.update(req.body, {
        where: {
            userId: req.params.id
        }, 
        returning: true
    })
    .then(updatedProfile => {
        if(updatedProfile[0] === 0){
            res.status(constants.BAD_REQUEST).send("ERROR: Incorrect Profile Id")}
    })
    .catch(err => {
        res.status(constants.INTERNAL_SERVER_ERROR).send(`ERROR: ${err}`);
    })
}



module.exports = {
    getUserProfData,
    editProfile
}