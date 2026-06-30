const User = require('../user.schema.js');
const {matchedData} = require('express-validator');
const {StatusCodes} = require('http-status-codes');
const logger = require('../../helpers/winston.helper.js');

async function createUserProvider(req,res){
    const validatedData = matchedData(req);
    try{
        const user = new User({
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            email: validatedData.email,
            password: validatedData.password
        });
        await user.save();
        delete user.password;
        return res.status(StatusCodes.CREATED).json(user);
    }
    catch(error){
        logger.error("Error occurred while creating user", req, error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            reason: "Failed to create user please try again later"
        });
    }
    
    
}
module.exports = createUserProvider;