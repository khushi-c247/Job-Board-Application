import nodemailer from "nodemailer";

const transpoter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "khushi.c@chapter247.com",
    pass: "Khushi@0108",
  },
});
const mailuser = async (mailId: string, title: string) => {
  const mailOptions: nodemailer.SendMailOptions = {
    from: "khushi.c@chapter247.com",
    to: mailId,
    subject: "Job application at Chapter247",
    text: `Hello candidate, your job application for ${title} has been successfully sent `,
  };
  try {
    const info = await transpoter.sendMail(mailOptions);
    console.log("Email sent", info.response);
    return;
  } catch (error) {
    console.log(error);
  }
};

const resetPasswordMailer = async (
  userName: string,
  mailId: string,
  token: string
) => {
  const mailOptions: nodemailer.SendMailOptions = {
    from: "khushi.c@chapter247.com",
    to: mailId,
    subject: "Job application at Chapter247",
    text: `
         Hello ${userName},
         We have recived a request for the password change. Please click on the link given below  and change the password with the given token.
         
        Note: This token is only valid for 2hrs.
        Link:http://localhost:3000/v1/user/reset?token=${token}`,
  };
  try {
    const info = await transpoter.sendMail(mailOptions);
    console.log("Email sent", info.response);
  } catch (error) {
    console.log(error);
  }
};

const passwordChanged = async (email:string|undefined,)=>{
  const mailOptions: nodemailer.SendMailOptions = {
    from: "khushi.c@chapter247.com",
    to: email,
    subject: "Password changed",
    text: `Hello User, your password has been changed`,
  };
  try {
    const info = await transpoter.sendMail(mailOptions);
    console.log("Email sent", info.response);
    return;
  } catch (error) {
    console.log(error);
  }
}
export { mailuser, resetPasswordMailer , passwordChanged };
