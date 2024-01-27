document.addEventListener('DOMContentLoaded', function() {

	notes = ['As3','B3','C4','Cs4','D4','Ds4','E4','F4','Fs4','G4','Gs4','A4','As4','B4',
			'C5','Cs5','D5','Ds5','E5','F5','Fs5','G5','Gs5','A5','As5','B5', 'C6', 'Cs6'];

	for (i in notes)
	{
		note = notes[i]

		let labelDOM = document.createElement('div');
		labelDOM.className = 'label';
		labelDOM.textContent = idToName(note);

		let noteDOM = document.createElement('div');
		noteDOM.className = idToType(note) + '-key';
		noteDOM.id = note;
		noteDOM.appendChild(labelDOM);

		document.querySelector('div.piano').appendChild(noteDOM);
	}

	document.addEventListener('touchstart', handleTouchStart);
	document.addEventListener('touchmove', handleTouchStart);
	document.addEventListener('touchend', handleTouchEnd);
	document.addEventListener('touchcancel', handleTouchEnd);

	document.addEventListener('mousedown', handleMouseDown);
	document.addEventListener('mousemove', handleMouseDown);
	document.addEventListener('mouseup', handleMouseUp);
	document.addEventListener('mouseout', handleMouseUp);

})

const synth = new Tone.PolySynth(Tone.FMSynth).toDestination();

function getKeyFromPoint(x, y) {
	var touchedElement = document.elementFromPoint(x, y);
	if (touchedElement.id) {
		return touchedElement.id;
	} else {
		return touchedElement.parentElement.id;
	}
}

/** Dictionary of keys currently touched, indexed by touch identifier. **/
var currentKeys = {};

function moveTouchToKey(touchIdentifier, key) {
	if (currentKeys[touchIdentifier] !== key) {
		if (currentKeys[touchIdentifier]) {
			console.log('Touch ' + touchIdentifier + ' moved out of ' + currentKeys[touchIdentifier]);
			keyUp(currentKeys[touchIdentifier]) 
		};
		if (key) {
			console.log('Touch ' + touchIdentifier + ' moved in to ' + key);
			keyDown(key);
		}
		currentKeys[touchIdentifier] = key;
	}
}

function handleTouchStart(event) {
	event.preventDefault();
	var touches = event.touches;
	for (var i = 0; i < touches.length; i++) {
		var touch = touches[i];
		var newKey = getKeyFromPoint(touch.clientX, touch.clientY);
		moveTouchToKey(touch.identifier, newKey);
	}
}

function handleTouchEnd(event) {
	event.preventDefault();
	var touches = event.changedTouches;
	for (var i = 0; i < touches.length; i++) {
		var touch = touches[i];
		moveTouchToKey(touch.identifier, null);
	}
}

function handleMouseDown(event) {
	event.preventDefault();
	if (event.buttons !== 1) {
		return;
	}
	var newKey = getKeyFromPoint(event.clientX, event.clientY);
	moveTouchToKey(0, newKey);
}

function handleMouseUp(event) {
	event.preventDefault();
	moveTouchToKey(0, null);
}

function start() {
	Tone.start()
}

function idToName(id) {
	name = id
		.replaceAll('D', 'Re')
		.replaceAll('C', 'Do')
		.replaceAll('E', 'Mi')
		.replaceAll('F', 'Fa')
		.replaceAll('G', 'Sol')
		.replaceAll('A', 'La')
		.replaceAll('B', 'Si')
		.replaceAll('s', '#');
	return name;
}

function idToTone(id) {
	tone = id
		.replaceAll('s', '#');
	return tone;
}

function idToType(id) {
	type = id.includes('s') ? 'black' : 'white';
	return type;
}

function keyDown(id) {
	document.querySelector('div#' + id).classList.add('active');
	playSound(idToTone(id));
}

function keyUp(id) {
	document.querySelector('div#' + id).classList.remove('active');
	stopSound(idToTone(id));
}

function playSound(note) {
	synth.triggerRelease(note, Tone.now());
	synth.triggerAttack(note, Tone.now());
}

function stopSound(note) {
	synth.triggerRelease(note, Tone.now());
}
