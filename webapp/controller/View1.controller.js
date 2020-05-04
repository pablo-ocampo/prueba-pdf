sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("pdf.prueba.controller.View1", {
		onInit: function () {

		},
		
		onUpload: function (oEvent) {
			debugger;
			var oFileUpload = this.getView().byId("fileUploader");
			var domRef = oFileUpload.getFocusDomRef();
			var file = domRef.files[0];
			var that = this;
			this.fileName = file.name;
			this.fileType = file.type;
			var reader = new FileReader();
			reader.onload = function (e) {
				var vContent = e.currentTarget.result.replace("data:" + file.type + ";base64,", "");
				that.postFileToBackend(that.fileName, vContent);
				};
			reader.readAsDataURL(file);
		},
		
		postFileToBackend: function(nombre, contenido) {
			var oModel = this.getView().getModel();
			var pdf = {
				"Filename": nombre,
				"Value": btoa(contenido)
			};
			
			oModel.create("/zarchivoSet",pdf,{
				success: function () {
					MessageBox.success("Bien ahi!");
				}	,
				error: function() {
					MessageBox.error("Mal ahi!");
				}
			});
		}
	});
});