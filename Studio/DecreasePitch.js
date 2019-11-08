studio.menu.addMenuItem({
	name: "Scripts\\DecreasePitch",

    
    execute: function () {
     
        var sounds = studio.window.editorSelection();

        for (x = 0; x < sounds.length; x++) {

            var pitchProperty = sounds[x].modulators.filter(function (obj) {
                              return obj.entity === 'RandomizerModulator'; })[0]; 
    
    pitchProperty.amount -= 0.8;
        }  
    
    },
    keySequence: "Ctrl+Shift+1",
});

