// helpers

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


function verifyToken(token, type){
    const secret = type === "access" ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;
    return jwt.verify(token, secret);
}


function createTokens(user, type){
    if(type === "access"){
        const accessToken = jwt.sign({id: user.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'});
        return {accessToken};
    }

    const accessToken = jwt.sign({id: user.id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'});
    const refreshToken = jwt.sign({id: user.id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '5m'});

    return {accessToken, refreshToken};
}

async function generatePasswordHash(password){
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

module.exports = {
    verifyToken,
    createTokens,
    generatePasswordHash
}