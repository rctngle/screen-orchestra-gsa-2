var socket = io('http://10.1.133.169:3000');
socket.on('connect', function(){
	console.log('monitor connect');
});

socket.on('msg', function(data){
	console.log('controller event:', data);
	document.querySelector('iframe#main').setAttribute('src', 'commands/'+data+'/index.html');
});

socket.on('disconnect', function(){
	console.log('controller disconnect');
});
