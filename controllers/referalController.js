
const getPrismaClient = require('../client.js');
const yup = require('yup');
const sendMail = require('../utils/sendMail.js');
const { Prisma } = require('@prisma/client');


const referalSchema = yup.object().shape({
    refererName: yup.string().required("Referer Name is required"),
    refererEmail: yup.string().email("Please provide valid referer email.").required("Referer Email is required"),
    refereeEmail: yup.string().email("Please provide valid referee email.").required("Referee Email is required"),
    message: yup.string().optional()
})

const createReferal = async (req, res) => {

    const { refererName, refererEmail, refereeEmail, message } = req.body;




    try {

        await referalSchema.validate({
            refererName,
            refererEmail,
            refereeEmail,
            message
        })

        const prisma = getPrismaClient();

        const referal = await prisma.referral.create({
            data: {
                refererName,
                refererEmail,
                refereeEmail,
                message
            }
        });

        await sendMail(refererName, refererEmail, refereeEmail, message);

        console.log(referal);
        res.status(201).json(referal);
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Handle Yup validation errors
            const validationErrors = error.errors.map((err) => err);
            res.status(400).json({ message: validationErrors[0] }); // Return the first validation error message
        } else if(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002' ){
            return res.status(400).json({message: "Referral already exists"});
        }
        else {
            // Handle other unexpected errors
            console.error("Internal server error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }


}

const referalController = {
    createReferal
}

module.exports = referalController;


