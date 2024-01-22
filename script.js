$(document).ready(function(){

	notes = 
	[
		{
			'id':'C4',
			'type': 'white',
			'name': 'Do4',
		},
		{
			'id':'C#4',
			'type': 'black',
			'name': 'Do#4',
		},
		{
			'id':'D4',
			'type': 'white',
			'name': 'Re4',
		},
		{
			'id':'D#4',
			'type': 'black',
			'name': 'Re#4',
		},
		{
			'id':'E4',
			'type': 'white',
			'name': 'Mi4',
		},
		{
			'id':'F4',
			'type': 'white',
			'name': 'Fa4',
		},
		{
			'id':'F#4',
			'type': 'black',
			'name': 'Fa#4',
		},
		{
			'id':'G4',
			'type': 'white',
			'name': 'Sol4',
		},
		{
			'id':'G#4',
			'type': 'black',
			'name': 'Sol#4',
		},
		{
			'id':'A4',
			'type': 'white',
			'name': 'La4',
		},
		{
			'id':'A#4',
			'type': 'black',
			'name': 'La#4',
		},
		{
			'id':'B4',
			'type': 'white',
			'name': 'Si4',
		},
		{
			'id':'C5',
			'type': 'white',
			'name': 'Do5',
		},
		{
			'id':'C#5',
			'type': 'black',
			'name': 'Do#5',
		},
		{
			'id':'D5',
			'type': 'white',
			'name': 'Re5',
		},
		{
			'id':'D#5',
			'type': 'black',
			'name': 'Re#5',
		},
		{
			'id':'E5',
			'type': 'white',
			'name': 'Mi5',
		},
		{
			'id':'F5',
			'type': 'white',
			'name': 'Fa5',
		},
		{
			'id':'F#5',
			'type': 'black',
			'name': 'Fa#5',
		},
		{
			'id':'G5',
			'type': 'white',
			'name': 'Sol5',
		},
		{
			'id':'G#5',
			'type': 'black',
			'name': 'Sol#5',
		},
		{
			'id':'A5',
			'type': 'white',
			'name': 'La5',
		},
		{
			'id':'A#5',
			'type': 'black',
			'name': 'La#5',
		},
		{
			'id':'B5',
			'type': 'white',
			'name': 'Si5',
		},
	];

	for (i in notes)
	{
		note = notes[i]
		$('div.piano').append(
			'<div class="' + note.type + '-key" ' + 
			'onpointerdown="playSound(\'' + note.id +'\');" ' +
			'onpointerup="stopSound(\'' + note.id +'\');" ' + 
			'onpointerout="stopSound(\'' + note.id +'\');"></div>');
	}
})

const synth = new Tone.PolySynth(Tone.FMSynth).toDestination();

function start() {
	Tone.start()
}

function playSound(note) {
	synth.triggerRelease(note, Tone.now());
	synth.triggerAttack(note, Tone.now());
}

function stopSound(note) {
	synth.triggerRelease(note, Tone.now());
}
