const express = require("express");
const router = express.Router();

const referalController = require('../controllers/referalController');
const getPrismaClient  = require('../client.js');
const emailValidator = require("../middleware/validator.js");

router.get("/", async (req, res) => {

    const prisma = getPrismaClient();
    const referrals = await prisma.referral.findMany();


    res.status(200).json({referrals});
})

router.post('/', emailValidator,  referalController.createReferal );

module.exports = router;


/*
 sample object:
{
    "refererName": "John Doe",
    "refererEmail": "john@email.com",
    "refereeEmail": "jonga@gmail.com",
    "message": "20% off on my code"
}
*/
