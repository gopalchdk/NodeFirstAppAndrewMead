const express = require('express');

const hbs = require('hbs');

const fs = require('fs');

var app = express();



app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n');
    next();
})

// app.use((req,res,next)=>{
//     res.render('maintainence.hbs');
// })

app.use(express.static(__dirname+'/public'));

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear',(value)=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    title:'Home Page',
    welcomeMessage:'Hello User'
  })
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title:'About Page'
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Unable to find the page'
    })
});

app.listen(3000,()=>{
    console.log('Server is up and running on port 3000');
});