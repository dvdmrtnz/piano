$(document).ready(function(){

	notes = 
	[
		{
			'id':'C4',
			'type': 'white',
		},
		{
			'id':'Cs4',
			'type': 'black',
		},
		{
			'id':'D4',
			'type': 'white',
		},
		{
			'id':'Ds4',
			'type': 'black',
		},
		{
			'id':'E4',
			'type': 'white',
		},
		{
			'id':'F4',
			'type': 'white',
		},
		{
			'id':'Fs4',
			'type': 'black',
		},
		{
			'id':'G4',
			'type': 'white',
		},
		{
			'id':'Gs4',
			'type': 'black',
		},
		{
			'id':'A4',
			'type': 'white',
		},
		{
			'id':'As4',
			'type': 'black',
		},
		{
			'id':'B4',
			'type': 'white',
		},
		{
			'id':'C5',
			'type': 'white',
		},
		{
			'id':'Cs5',
			'type': 'black',
		},
		{
			'id':'D5',
			'type': 'white',
		},
		{
			'id':'Ds5',
			'type': 'black',
		},
		{
			'id':'E5',
			'type': 'white',
		},
		{
			'id':'F5',
			'type': 'white',
		},
		{
			'id':'Fs5',
			'type': 'black',
		},
		{
			'id':'G5',
			'type': 'white',
		},
		{
			'id':'Gs5',
			'type': 'black',
		},
		{
			'id':'A5',
			'type': 'white',
		},
		{
			'id':'As5',
			'type': 'black',
		},
		{
			'id':'B5',
			'type': 'white',
		},
	];

	for (i in notes)
	{
		note = notes[i]
		$('div.piano').append(
			'<div class="' + note.type + '-key" id="' + note.id + '" ' +
			'onpointerdown="keyDown(\'' + note.id +'\');" ' +
			'onpointerup="keyUp(\'' + note.id +'\');" ' + 
			'onpointerout="keyUp(\'' + note.id +'\');" ' +
			'onpointercancel="keyUp(\'' + note.id +'\');">' +
			    '<div class="label">' + idToName(note.id) + '</div>' + 
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

function keyDown(id) {
	playSound(idToTone(id));
}

function keyUp(id) {
	stopSound(idToTone(id));
}

function playSound(note) {
	synth.triggerRelease(note, Tone.now());
	synth.triggerAttack(note, Tone.now());
}

function stopSound(note) {
	synth.triggerRelease(note, Tone.now());
}
