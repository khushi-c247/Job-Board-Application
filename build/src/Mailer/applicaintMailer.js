"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordMailer = exports.mailuser = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transpoter = nodemailer_1.default.createTransport({
    service: "Gmail",
    auth: {
        user: "khushi.c@chapter247.com",
        pass: " ",
    },
});
const mailuser = (mailId, title) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: "khushi.c@chapter247.com",
        to: mailId,
        subject: "Job application at Chapter247",
        text: `Hello candidate, your job application for ${title} has been successfully sent `,
    };
    try {
        const info = yield transpoter.sendMail(mailOptions);
        console.log("Email sent", info.response);
        return;
    }
    catch (error) {
        console.log(error);
    }
});
exports.mailuser = mailuser;
const resetPasswordMailer = (userName, mailId, token) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: "khushi.c@chapter247.com",
        to: mailId,
        subject: "Job application at Chapter247",
        text: `
         Hello ${userName},
         We have recived a request for the password change. Please click on the link given below  and change the password with the given token.
         
 
        Token:
        ${token}

        Note: This token is only valid for 2hrs.
        Link:http://localhost:3000/v1/user/reset`,
    };
    try {
        const info = yield transpoter.sendMail(mailOptions);
        console.log("Email sent", info.response);
    }
    catch (error) {
        console.log(error);
    }
});
exports.resetPasswordMailer = resetPasswordMailer;
