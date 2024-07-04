
const getPrismaClient = require('../client.js');

const createReferal = async (req, res) => {
    
    const {refererName, refererEmail, refereeEmail, message} = req.body;

    if (!refererName || !refererEmail || !refereeEmail) {
        return res.status(400).json({message: "Please provide all required fields"});
    }

    const prisma = getPrismaClient();

    try{
        const referal = await prisma.referral.create({
            data: {
                refererName,
                refererEmail,
                refereeEmail,
                message
            }
        });

        console.log(referal);
        res.status(201).json(referal);
    }catch(error){

        console.error(error);
        res.status(500).json({message: "Internal Server Error"});
    }


}

const referalController = {
    createReferal
}

module.exports = referalController;
