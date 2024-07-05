const { google } = require("googleapis");
const nodemailer = require("nodemailer");

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
)

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

async function sendMail(refererName, refererEmail, refereeEmail, message) {


    try {

        const refererEmailBody = `
        Hi ${refererName},
    
        You have successfully referred ${refereeEmail} through your referral program!
    
        Here are the referral details:
          - Referrer Name: ${refererName}
          - Referee Email: ${refereeEmail}
          - Message: ${message || 'No message provided'}

    
        Thanks for referring your friend!
    
        Sincerely,
    
        The Acredian Support Team
      `;

        const refereeEmailBody = `
    Hi ${refereeEmail},

    You have been referred to Accredian courses by ${refererName}.

    Here are the details:
        - Referrer Name: ${refererName}
        - Referrer Email: ${refererEmail}
        - Message: ${message || 'No message provided'}

    To learn more, visit our website: https://accredian.com

    Sincerely,

    The Accredian Support Team
`;


        const accessToken = await oAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken
            }
        });

        const refererMailOptions = {
            from: process.env.EMAIL,
            to: refererEmail,
            subject: `Successfully referred ${refereeEmail}!`,
            text: refererEmailBody,
            html: `<pre style="background: #EEF5FF; padding: 10px 5px; color: black; font-size: 20px;">${refererEmailBody}</pre>`
        }
        const refereeMailOptions = {
            from: process.env.EMAIL,
            to: refereeEmail,
            subject: `Referral from ${refererName}`,
            text: refereeEmailBody,
            html: `<pre style="background: #EEF5FF; padding: 10px 5px; color: black; font-size: 20px;"> ${refereeEmailBody}</pre>`
        }

        let mailError = null;
        try{
            const refererMailResult = await transporter.sendMail(refererMailOptions);
            console.log(refererMailResult);
            
        }catch(error){
            console.log('Error sending referer email', error);
            mailError = error;
        }
        try{
            
            const refereeEmailResult = await transporter.sendMail(refereeMailOptions);
            console.log(refereeEmailResult)
        }catch(error){
            console.log('Error sending referee email', error);
            mailError = error;
        }

        if(mailError){
            console.log("Mail Error", mailError)
            return {error: mailError};
        }
        return {message: "Emails sent successfully!"};
    } catch (error) {
        return error;
    }
}

module.exports = sendMail;