studio.menu.addMenuItem({
	name: "Unity\\ScriptableObject",
	isEnabled: function () {
		var events = studio.window.browserSelection();
		return events
    },
    
    execute: function () {
        var events = studio.window.browserSelection();
        
        var lineBreak = "\r\n";
        var leftCurly = String.fromCharCode(123);
        var rightCurly = String.fromCharCode(125);
        var tab = String.fromCharCode(9);
        var quote = String.fromCharCode(34);
        var attribute = "[FMODUnity.EventRef]";
        var modifier = "public string "
        var using = "using System.Collections;" 
                     + lineBreak
                     + "using System.Collections.Generic;" 
                     + lineBreak
                     + "using UnityEngine;"
                     + lineBreak + lineBreak;
        var menuName = quote + studio.system.getText("Menu Name (Example: 'SO/Audio/Player'", "") + quote;
        var className = studio.system.getText("Class Name", "");
        var assetMenuText = "[CreateAssetMenu(menuName = " + menuName + ", " + "fileName = " + quote + className + quote + ")]" + lineBreak;
        var classText = "public class " + className + " : ScriptableObject" + lineBreak + leftCurly + lineBreak;

        var finalData = using + assetMenuText + classText;

        for (x = 0; x < events.length; x++) {
            var eventName = events[x].name;
            eventName = eventName.replace(/\s+/g, '');

            finalData += tab + attribute + lineBreak + tab + modifier + eventName + " = " + quote + events[x].getPath() + quote + ";" + lineBreak + lineBreak; 
        }

        finalData += rightCurly;

        var projectPath = studio.project.filePath;
        projectPath = projectPath.substr(0, projectPath.lastIndexOf("/"));
        var filePath = projectPath + "/" + className + ".cs";
		var file = studio.system.getFile(filePath);

		file.open(studio.system.openMode.WriteOnly);
		file.writeText(finalData);
		file.close();
    }
});

