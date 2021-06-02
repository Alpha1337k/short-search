class searchmatch {
	constructor(uri, id) {
		this.uri = uri;
		this.id = id;
	}
}

var webpages;

chrome.storage.sync.get(['list'], function(result) {
	webpages = JSON.parse(result.list);
	console.log(webpages);
});
	
chrome.commands.onCommand.addListener(function (command) {
		
	console.log(webpages);
    chrome.tabs.query({ active: true,  lastFocusedWindow: true }, function (tabs) {
		
		var url = tabs[0].url;
		for (var i = 0; i < webpages.length; i++)
		{
			console.log("Matching " + url + " against " + webpages[i].uri);
			// console.log(url.match(new RegExp(webpages[i].uri)));
			if (url.match(new RegExp(webpages[i].uri)))
			{
				chrome.tabs.sendMessage(tabs[0].id, webpages[i]);
				break;
			}
		}
	});
});

function updatelist() {
	chrome.storage.sync.get(['list'], function(result) {
		webpages = JSON.parse(result.list);
		console.log("Updated list!");
	});
}