const express = require("express");
const nodemailer = require("nodemailer")

const app = express();

app.get("/",function(request,response){
    response.sendFile(__dirname+"/MainMenu/index.html")
})

app.get("/javascript", function(request, response) {
    response.sendFile(__dirname+"/javascript/index.html")
});

app.get("/javascript/code=:id",function(request,response){
    response.sendFile(__dirname+"/javascript/codeIndex.html")
})

app.get("/html", function(request, response) {
    response.sendFile(__dirname+"/html/index.html")
});

app.get("/html/code=:id",function(request,response){
    response.sendFile(__dirname+"/html/codeIndex.html")
})

app.get("/feedback",function(request,response){
    response.sendFile(__dirname+"/feedback/index.html")
})


app.post('/feedbackdata', (request, response) => {
    const data = {
        "ad":request.body.name,
        "soyAd":request.body.surName,
        "email":request.body.emailAdress,
        "geriBildirimNedeni":request.body.selectValue,
        "mesaj":request.body.message
    }

    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nodecodeeditor@gmail.com',
            pass: 'spyp uvjl zyfl txeo'
        }
    });
    
    let mailOptions = {
        from: 'nodecodeeditor@gmail.com',
        to: 'emirhantopal1545@gmail.com',
        subject: `${data.geriBildirimNedeni}`, 
        text: `${data.ad} ${data.soyAd} adlı kullanıcı ${data.geriBildirimNedeni} nedeniyle şu mesajı gönderdi:\n${data.mesaj}\n\n\n\nmail adresi: ${data.email}`
    };
    
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            
        } else {
            
        }
    });
    response.sendFile(__dirname+"/feedback/sucsessfully.html")
});

app.use(function(request,response){
    response.status(404).sendFile(__dirname+"/404/index.html");
})

app.listen(3000, function() {
    console.log("Sunucu http://localhost:3000 adresinde çalıştırılıyor!");
});
