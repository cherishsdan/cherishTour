var express = require('express');
var exphbs = require('express-handlebars');
var fortune = require('./lib/fortune.js');

var app = express();

app.set('port',process.env.PORT || 3000);

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
    res.render('home')
});
app.get('/about',function(req,res){
    res.render('about',{fortune:fortune.getFortune()});
})

app.use(function(req,res,next){
    //res.type('text/plain');
    res.status(404);
    res.render('404');
});
app.use(function(err,req,res,next){
    console.log(err.stack);
    //res.type('text/plain');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'),function(){
    console.log('Express started on http://localhost: ' + app.get('port') + '; press Ctrl-C to terminate');
})