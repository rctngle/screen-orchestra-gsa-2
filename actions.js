
if (typeof(io) === 'undefined') {
	io = false;
}

if (io) {
	var socket = io('http://172.17.26.96:3000');
	socket.on('connect', function(){
		console.log('monitor connect');
		// const video = document.querySelector('video');
		// video.play();
		// video.muted = false;
	});

	socket.on('slider', function(data){
		if (window.onSliderChange) {
			window.onSliderChange(data);
		}
	});

	socket.on('text', function(data){
		if (window.onTextChange) {
			window.onTextChange(data);
		}
	});
}
