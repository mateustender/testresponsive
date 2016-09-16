function openListLink (url) {
	if (!isTextSelected()) {
		window.location.href = url;
	}
}

function isTextSelected() {
	var selection = getSelection().toString();
	if (selection) {
		return true;
	} else {
		return false;
	}
}

