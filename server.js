const fs = require('fs');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const ip = require('ip');
const clients = [];

app.use(express.static('.'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});	

app.get('/controller', function(req, res){
	res.sendFile(__dirname + '/controller.html');
});	

app.get('/monitor', function(req, res){
	res.sendFile(__dirname + '/monitor.html');
});	

app.get('/commands', function(req, res) {
	const shared = fs.readdirSync('./commands/shared/');
	const individual = fs.readdirSync('./commands/individual/');

	res.json({
		shared: shared,
		individual: individual,
	});
});	

app.get('/ip', function(req, res) {
	res.json({
		ip: ip.address(),
	});
});	

http.listen(3000, function(){
	console.log('⚠️ update controller.js and monitor.js ⚠️');
	console.log('http://'+ip.address()+':3000');
	
});

io.on('connection', function(client){
	clients.push(client);
	client.on('disconnect', function() {
		clients.splice(clients.indexOf(client), 1);
	});
 
	client.on('msg', function(msg){
		client.broadcast.emit('msg', msg);
	});

	client.on('slider', function(value){
		client.broadcast.emit('slider', value);
	});

	client.on('text', function(value){
		client.broadcast.emit('text', value);
	});
});