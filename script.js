var express = require('express');
var bb= require('express-busboy')

var app = express();
var x = [Date.now()];
x = x.toString().split('');
x=x[x.length-2]

var i=3;
var v='Pas encore de resultat';
app.get('/', function(req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.write('<!DOCTYPE html>'+
		'<head>'+
		'<meta charset="utf-8"/>'+
		'<title>Nombre mystère</title>'+
		'</head>'+
		'<body>'+
		'<form method="post" action="/">'+
		'<input type="number" min="0" max="9" name="number">'+
		'<input type="submit" value="Valider">'+
		x+
		'</form>'+
		i+'essais restants'+'<br />'+
		v+
		'</body>');
 });

bb.extend(app)

app.post('/',function(req,res){

	function retrieve(){
		var b=req.body.number;
		if(b==x){
			v='Trouvé ! Bien joué à toi !'
			i=3
		}if(b<x){
			i--
			v='C\'est plus'
		}if(b>x){
			i--
			v='C\'est moins !'
		}
		if(i==0){
			v='Vous avez perdu'
			i=3
		}
		res.redirect('/')
	}
	retrieve();
});

app.use(function(req, res, next){
	res.setHeader('Content-Type', 'text/plain');
	res.status(404).send('Page introuvable !');
});

app.listen(8080);