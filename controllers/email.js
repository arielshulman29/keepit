const emailList=[];
if (process.env.NODE_ENV !== "production") {
    emailList.push('arielshulmandev@gmail.com');
}
else{
    emailList.push('Sharon@keepit.co.il','Rotem@keepit.co.il');
}

module.exports.emailSent = async (req, res, next) => {
    res.render('mail/contact');
}

module.exports.sendEmail = async (req, res, next) => {
    const { name, city, tel, sendArea } = req.body;
    console.log(name,city,tel,sendArea);
    const mailText=' שם: '+name+' עיר: '+city+' טלפון: '+tel+' שטח: '+sendArea+' קוב ';
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: emailList, 
        from: 'arielshulmandev@gmail.com', 
        subject: 'נתוני לקוח ממחשבון אחסנה',
        text: mailText,
        html: '<strong>'+mailText+'</strong>'
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
    res.redirect('/mail');
}