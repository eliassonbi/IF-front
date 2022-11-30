function validateFileSize (component){
	var fileSize = null;
	// Getting file size
	if (navigator.appName=="Microsoft Internet Explorer"){
		if(component.value){
			var oas = new ActiveXObject("Scripting.FileSystemObject");
			var file = oas.getFile(component.value);
			fileSize = file.size;
		}
	}
	else {
		if (component.files[0] != undefined){
			fileSize = component.files[0].size;
		}
	}
	// Checking file size
	//if (fileSize != null && fileSize > 7340032){
	//if (fileSize != null && fileSize > 20971520){
	if (fileSize != null && fileSize > 52428800){
		return false;
	}
	else {
		return true;
	}
}