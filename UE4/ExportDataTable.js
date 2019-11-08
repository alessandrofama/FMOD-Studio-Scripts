studio.menu.addMenuItem({
	name: "UE4\\DataTable",
	isEnabled: function () {
		var events = studio.window.browserSelection();
		return events
	},

	execute: function () {
		var events = studio.window.browserSelection();
		var parameterNumber = studio.system.getNumber("Parameter Number", "0");
		var FinalData = "Name" + "," + "FMODEvent";

		for (x = 0; x < parameterNumber; x++) {
			FinalData += "," + "Parameter" + " " +  (x+1);
		}

		for (x = 0; x < events.length; x++) {
			var quotes = String.fromCharCode(34);
			var quote = String.fromCharCode(39);
			var event = events[x].getPath();
			var eventName = events[x].name;
			var parameters = events[x].getParameterPresets();
			var parameterNames = "";

			for (y = 0; y < parameters.length; y++) {
				parameterNames += "," + parameters[y].presetOwner.name;
			}

			event = event.replace('event:', quotes + 'FMODEvent' + quote + '/Game/FMOD/Events');
			event += "." + eventName + quote + quotes;
			FinalData += "\r\n" + eventName + "," + event + parameterNames;
		}

        var fileName = studio.system.getText("File Name", "NewFile");
        var projectPath = studio.project.filePath;
        projectPath = projectPath.substr(0, projectPath.lastIndexOf("/"));
        var filePath = projectPath + "/" + fileName + ".csv";
		var file = studio.system.getFile(filePath);

		file.open(studio.system.openMode.WriteOnly);
		file.writeText(FinalData);
		file.close();
	}
});

