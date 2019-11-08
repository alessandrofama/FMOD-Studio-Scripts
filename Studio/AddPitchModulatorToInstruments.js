studio.menu.addMenuItem({
	name: "Scripts\\AddPitchModulator",

    
    execute: function () {
        var sounds = studio.window.editorSelection();

        for (x = 0; x < sounds.length; x++) {
            sounds[x].addModulator("RandomizerModulator", sounds[x].properties.pitch)
        }  
    
    },
    keySequence: "Ctrl+Shift+Q",
});

