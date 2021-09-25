const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENGRID_API_KEY)
// sgMail.send({
//     to: 'bains.rk13@gmail.com',
//     from: 'rb.ravibains@gmail.com',
//     subject: 'This is my first email creation',
//     text: 'And easy to do anywhere, even with Node.js',
//     html: '<strong>And easy to do anywhere, even with Node.js</strong>',
// }).then(() => {
//     console.log('Message sent')
// }).catch((error) => {
//     console.log(error.response.body)
// })

const sendWelcomeEmail = (email,name) => {
    sgMail.send({
        to: email,
        from: 'rb.ravibains@gmail.com',
        subject: 'Welcome to nodejs world',
        text: 'Dear {name} Welcome to nodejs world, it works for everything',
        html: '<strong>And easy to do anywhere, even with Node.js</strong>',
    }).then(() => {
            console.log('Message sent')
        }).catch((error) => {
            console.log(error.response.body)
     })
}

const sendCancelingEmail = (email,name) => {
    sgMail.send({
        to: email,
        from: 'rb.ravibains@gmail.com',
        subject: 'Sorry to see you leave',
        text: 'Dear {name} Welcome to nodejs world, it works for everything',
        html: '<strong>Goodbye, {name} hope to see you soon.</strong>',
    }).then(() => {
            console.log('Message sent')
        }).catch((error) => {
            console.log(error.response.body)
     })
}


module.exports = {
    sendWelcomeEmail,
    sendCancelingEmail
}