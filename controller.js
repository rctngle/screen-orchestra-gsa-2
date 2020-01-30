const ip = '10.1.133.169';
document.querySelector('#ip').innerHTML = ip;

var socket = io('http://' + ip + ':3000');
socket.on('connect', function(){
	console.log('controller connect');
});

socket.on('event', function(data){
	console.log('controller event');
});

socket.on('disconnect', function(){
	console.log('controller disconnect');
});

document.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		socket.emit('msg', link.getAttribute('href'));
	});
});

function setActive(listItem) {
	document.querySelectorAll('.active').forEach((el) => {
		el.classList.remove('active');
	});
	listItem.classList.add('active');
}

fetch('http://' + ip + ':3000/commands').then(response => response.json()).then(data => {
	for (let list in data) {
		data[list].forEach((item) => {
			if (item.indexOf('.') !== 0) {
				const listItem = document.createElement('li');

				if (item === 'slide') {
					listItem.innerHTML = `<button type="button">${item}</button> <input type="range" />`;
				} else if (item === 'say') {
					listItem.innerHTML = `<button type="button">${item}</button> <input type="text" />`;
				} else {
					listItem.innerHTML = `<button type="button">${item}</button>`;
				}

				document.querySelector('#'+list).appendChild(listItem);

				listItem.querySelector('button').addEventListener('click', () => {
					setActive(listItem);
					socket.emit('msg', list+'/'+item);
				});

				if (listItem.querySelector('input[type=range]')) {
					listItem.querySelector('input[type=range]').addEventListener('input', (e) => {
						socket.emit('slider', parseInt(e.target.value));	
					});
				}

				if (listItem.querySelector('input[type=text]')) {
					listItem.querySelector('input[type=text]').addEventListener('input', (e) => {
						socket.emit('text', e.target.value);	
					});
				}
			}
		});
	}
});
