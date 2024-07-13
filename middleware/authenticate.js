const { verifyToken, createTokens } = require("../utils/tokens");

module.exports = function (req, res, next) {
    const accessToken = req.headers.authorization;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken ||  !refreshToken) {
        return res.status(401).json({ error: "Unauthorized" });
    }


    try{
        const user = verifyToken(accessToken, "access");
        req.user = user;
        return next();
    }catch(error){
        console.log(error, "access token error");

        try{
            const user = verifyToken(refreshToken, "refresh");
            req.user = user;

            const {accessToken} = createTokens(user, "access");
            res.setHeader("Authorization", accessToken);
            
            return next();

        }catch(error){
            console.log(error, "refresh token error");
            return res.status(401).json({error: "Unauthorized"});
        
        }
    }
}



