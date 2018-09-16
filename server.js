const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
app.set('view engine' , 'hbs' );

app.use((req, res, next)=>{
  var now = new Date().toString();
  console.log(`${now}`);
  var log = `${now} ${req.method} ${req.url}`;
  fs.appendFile('middleware.log', log + '\n', (err)=>{
    if(err){
      console.log('cant update');
    }
  });
  next();
});

app.use((req, res, next)=>{
  res.render('maintain.hbs');

});

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('date',()=>{
  return new Date();
});

hbs.registerHelper('scream',(text)=>{
return text.toUpperCase();

});
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res)=>{
res.render('home.hbs', {
  pagetitle:'home page',
  name:'vrushita'

});

});

app.get('/about', (req, res)=>{
res.render('about.hbs', {
  pagetitle:'about page',
  name:'vrushita'
})

});


app.listen(3000, ()=>{
  console.log('server up');
});
