
const bcrypt = require('bcrypt');
const getPrismaClient = require('../client')
const jwt = require('jsonwebtoken');
const { createTokens, generatePasswordHash, verifyToken } = require('../utils/tokens');

async function register(req, res){
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400).json({error: "Please provide all fields"});
    }

    const prisma = getPrismaClient();
    try {
        const hash = await generatePasswordHash(password);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hash
            }
        });

        const {accessToken, refreshToken} = createTokens(user);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false, // set to true in production
            samesite: 'None'
        });

        res.status(201).json({user, accessToken});


    }catch(error){
        console.log(error);
        res.status(400).json({error: error.message});
    }

}

async function login(req, res){

    const {email, password} = req.body;

    if(!email || !password){
        res.status(400).json({error: "Please provide all fields"});
    }

    const prisma = getPrismaClient();
    try{
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!user){
            return res.status(400).json({error: "Invalid credentials"});
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({error: "Invalid credentials"});
        }

        const {accessToken, refreshToken} = createTokens(user);

        res.cookie('refreshToken', refreshToken, { 
            httpOnly: true,
            secure: false, // set to true in production
            samesite: 'None'
        });

        res.status(200).json({user, accessToken});

        
    }catch(error){

        console.log(error);
        res.status(400).json({error});
    }

}

async function logout(req, res){
    res.clearCookie('refreshToken');
    return res.status(200).json({message: "Logged out successfully"});
}

async function validateToken(req, res){
    const {accessToken} = req.headers.authorization;
    console.log(req.cookies['refreshToken']);
    if(!accessToken){
        return res.status(401).json({error: "Unauthorized"});
    }
    try {
        const user = verifyToken(accessToken, "access");
        return res.status(200).json({user});
    }catch(error){
        console.log(error, 'access token error');
        return res.status(401).json({error: "Unauthorized"});
    }
}




module.exports = {
    register,
    login, 
    validateToken,
    logout
}