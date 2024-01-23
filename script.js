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
