var express = require('express');
var body= require('body-parser')

var app = express();
var x = [Date.now()];
x = x.toString().split('');
x=x[x.length-2]

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');
 	res.write('<!DOCTYPE html>'+
 		'<head>'+
 		'<meta charset="utf-8"/>'+
 		'<title>Nombre mystère</title>'+
 		'</head>'+
 		'<body>'+
 		'<input id="number" type="number" min="0" max="9">'+
 		'<button id="ans">Tester</button>'+
 		x+
 		'</body>')
 	res.end()
});

app.post('/',function(req,res){
	var a=req.body.ans.value;
	a.addEventListener('click',function(){
		var b=req.body.number.value;
	if(b==x){
		console.log('Trouvé ! Bien joué à toi !')
	}if(b<x){
		console.log('C\'est plus')
	}if(b>x){
		console.log('C\'est moins !')
	}
})
	res.end()
})

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(8080);