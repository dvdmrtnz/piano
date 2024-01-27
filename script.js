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
		noteDOM.onpointerdown = keyDown;
		noteDOM.onpointerup = keyUp;
		noteDOM.onpointerout = keyUp;
		noteDOM.onpointercancel = keyUp;

		document.querySelector('div.piano').appendChild(noteDOM);
	}
})

const synth = new Tone.PolySynth(Tone.FMSynth).toDestination();

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

function keyDown(event) {
	id = event.target.id;
	document.querySelector('div#' + id).classList.add('active');
	playSound(idToTone(id));
}

function keyUp(event) {
	id = event.target.id;
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
