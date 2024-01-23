$(document).ready(function(){

	notes = ['C4','Cs4','D4','Ds4','E4','F4','Fs4','G4','Gs4','A4','As4','B4',
			'C5','Cs5','D5','Ds5','E5','F5','Fs5','G5','Gs5','A5','As5','B5'];

	for (i in notes)
	{
		note = notes[i]
		$('div.piano').append(
			'<div class="' + idToType(note) + '-key" id="' + note + '" ' +
			'onpointerdown="keyDown(\'' + note +'\');" ' +
			'onpointerup="keyUp(\'' + note +'\');" ' + 
			'onpointerout="keyUp(\'' + note +'\');" ' +
			'onpointercancel="keyUp(\'' + note +'\');">' +
			    '<div class="label">' + idToName(note) + '</div>' + 
			'</div>');
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

function keyDown(id) {
	$('div#' + id).addClass('active');
	playSound(idToTone(id));
}

function keyUp(id) {
	$('div#' + id).removeClass('active');
	stopSound(idToTone(id));
}

function playSound(note) {
	synth.triggerRelease(note, Tone.now());
	synth.triggerAttack(note, Tone.now());
}

function stopSound(note) {
	synth.triggerRelease(note, Tone.now());
}
