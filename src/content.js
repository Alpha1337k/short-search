
chrome.runtime.onMessage.addListener(function (data) {
	console.log(data);
	if (data.id[0] == '.')
	{
		console.log("Class");
		data.id = data.id.substring(1);
		var items = document.getElementsByClassName(data.id);
		items[0].focus();
	}
	else if (data.id[0] == '#')
	{
		console.log("Id");
		data.id = data.id.substring(1);
		document.getElementById(data.id).focus();
	}
	else if (data.id[0] == ':')
	{
		console.log("Name");
		data.id = data.id.substring(1);
		var items = document.getElementsByName(data.id);
		items[0].focus();
	}
});