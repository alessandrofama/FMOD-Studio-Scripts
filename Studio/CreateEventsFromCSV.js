studio.menu.addMenuItem({
    name: "Scripts\\CreateEventsFromCSV",

    execute: function () {

        function doCSVToEvents(widget) {

            var path = widget.findWidget("m_csvFilePath").text();

            if (path.substr(path.length - 4).toUpperCase() !== ".CSV") {
                studio.system.message("Not a CSV file: " + path);
                return;
            }

            var file = studio.system.getFile(path);
            file.open(studio.system.openMode.ReadOnly);
            var fileSize = file.size();

            if (file.exists()) {
                var csv = file.readText(fileSize);
                var obj = CSVtoObj(csv)
                CreateEvents(obj);
            }
        }

        function CreateEvents(obj) {

            for (var i = 0; i < obj.length; i++) {

                var myEvent = studio.project.create("Event");
                myEvent.name = obj[i].Event;
                myEvent.folder = studio.project.workspace.masterEventFolder;

                for (var j = 0; j < obj[i].Tracks; j++) {
                    var track = myEvent.addGroupTrack();
                }

                if (obj[i].Spatializer == "x") {
                    myEvent.masterTrack.mixerGroup.effectChain.addEffect('SpatialiserEffect');
                }
            }
        }

        function CSVtoObj(csv) {
            var arr = csv.split('\n');
            var jsonObj = [];
            var headers = arr[0].split(',');
            for (var i = 1; i < arr.length; i++) {
                var data = arr[i].split(',');
                var obj = {};
                for (var j = 0; j < data.length; j++) {
                    obj[headers[j].trim()] = data[j].trim();
                }
                jsonObj.push(obj);
            }
            return jsonObj;
        }

        studio.ui.showModalDialog({
            windowTitle: "CSV To Events",
            windowWidth: 340,
            windowHeight: 120,
            widgetType: studio.ui.widgetType.Layout,
            layout: studio.ui.layoutType.VBoxLayout,
            items: [

                {
                    widgetType: studio.ui.widgetType.Label,
                    widgetId: "m_csvFilePathLabel",
                    text: "CSV File Path"
                },
                {
                    widgetType: studio.ui.widgetType.PathLineEdit,
                    widgetId: "m_csvFilePath",
                    text: "*.csv",
                    pathType: studio.ui.pathType.OpenFile
                },

                {
                    widgetType: studio.ui.widgetType.Layout,
                    layout: studio.ui.layoutType.HBoxLayout,
                    contentsMargins: {
                        left: 0,
                        top: 12,
                        right: 0,
                        bottom: 0
                    },
                    items: [{
                            widgetType: studio.ui.widgetType.Spacer,
                            sizePolicy: {
                                horizontalPolicy: studio.ui.sizePolicy.MinimumExpanding
                            }
                        },
                        {
                            widgetType: studio.ui.widgetType.PushButton,
                            text: "Add Events",
                            onClicked: function () {
                                doCSVToEvents(this);
                                this.closeDialog();
                            }
                        }
                    ]
                }
            ]
        });
    }
});
