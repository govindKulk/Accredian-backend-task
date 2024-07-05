const {validate} = require("deep-email-validator")

const validatorOptions = {
    email: 'name@example.org',
    validateRegex: true,
    validateMx: true,
    validateTypo: true,
    validateDisposable: true,
    validateSMTP: true,
  }

const emailValidator = async (req, res, next) => {
    const {refererEmail, refereeEmail} = req.body;

    if(!refererEmail || !refereeEmail) {
        return res.status(400).json({error: "Missing email address"});
    }

    if(!validateEmailPattern(refererEmail) || !validateEmailPattern(refereeEmail)) {
        return res.status(400).json({error: "Invalid email address"})
    }

    next();

    // const [res1, res2] = await Promise.all([validate({...validatorOptions, email: refererEmail}), validate({...validatorOptions, email: refereeEmail})]);
    // console.log(res1, res2);
    // if(res1.valid && res2.valid) {
    //     next();
    // } else {
    //     return res.status(400).json({error: "Invalid email address"})

    // }
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmailPattern(email) {
  return emailRegex.test(email);
}

module.exports = emailValidator;