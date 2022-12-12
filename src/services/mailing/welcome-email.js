import transporter from '#config/mailer.js'

export function sendWelcomeMail (user,token) {
    if(!user || !token) throw new Error("User or validation token missing")

    const messageToUser = {
                from: process.env.EMAIL_SENDER,
                to:user.email,
                subject: "Welcome to your todo app",
                html: `<h1>Welcome to our wonderful todo</h1><span>yourr token is: ${token}</span>`
            }
            return transporter.sendMail(messageToUser)
        }