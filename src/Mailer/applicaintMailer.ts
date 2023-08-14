import nodemailer from 'nodemailer'
const transpoter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: "k",
        pass: "K8"
    }
});
const mailuser = async (mailId: string, title: string) => {
    const mailOptions: nodemailer.SendMailOptions = {
        from: "khushi.c@chapter247.com",
        to: mailId,
        subject: 'Job application at Chapter247',
        text: `Hello candidate, your job application for ${title} has been successfully sent `
    }
    try {
        const info = await transpoter.sendMail(mailOptions)
        console.log('Email sent', info.response);

    } catch (error) {
        console.log(error)
    }
}

export default mailuser ;
