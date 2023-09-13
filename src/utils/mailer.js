import nodemailer from "nodemailer"
import config  from "../config/config.js"

const transport = nodemailer.createTransport({
    service: "gmail", port: 587, secure: false, auth: {user: config.gmail_username, pass: config.gmail_password}
})

export default async function sendMail(to, message) {
    return await transport.sendMail({from: "<gtathetrilogycj@gmail.com>", to: to || "gtathetrilogycj@gmail.com", subject: "E-Commerce Backend", html: message || "<h1>Prueba mailer</h1>"})
}
