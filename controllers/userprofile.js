const User = require("../models").User;
const Profile = require("../models").Profile;

const constants = require("../constants");

const getUserProfData = (req, res) => {
    console.log("params commin at cha")
    console.log(req.params)
    console.log(User.findAll())
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
        console.log("1")
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