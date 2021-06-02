let but = document.getElementById("add");
let status = document.getElementById("statusp");
let status_save = document.getElementById("status-save");
let searchlist = document.getElementById("div-Searchbars");
let savebtn = document.getElementById("savebtn");
let listData;

let listdeletebtns;

class searchmatch {
	constructor(uri, id) {
		this.uri = uri;
		this.id = id;
	}
}

chrome.storage.sync.get(['list'], function(result) {
	listData = JSON.parse(result.list);
	for (let i = 0; i < listData.length; i++)
	{
		searchlist.innerHTML += '<tr id="trw'+ i +'"><td>' + listData[i].uri + "</td><td>" + listData[i].id + '</td><td><button class="deleter" id="'+i+'">X</td>'
	}
	listdeletebtns = document.getElementsByClassName("deleter");
	for (var i = 0; i < listdeletebtns.length; i++) {
		listdeletebtns[i].addEventListener('click', deletebar, false);
	}
});


but.addEventListener("click", async () => {

	if (document.getElementById("regex-url").value == "" || document.getElementById("Identifier").value == "")
	{
		status.style.display = "block";
		status.style.color = "red";
		status.innerHTML = "please fill in all the data!";
		return;
	}
	let type;
	var radiovals = document.getElementsByName('id-type')
	for (var x = 0; x < radiovals.length; x++)
	{
		if (radiovals[x].checked)
		{
			type = radiovals[x].value;
			break;
		}
	}

	var sm = new searchmatch(document.getElementById("regex-url").value, 
	type + document.getElementById("Identifier").value)

	listData.push(sm);
	let i = listData.length - 1;
	searchlist.innerHTML += '<tr id="trw'+ i +'"><td>' + listData[i].uri + "</td><td>" + listData[i].id + '</td><td><button class="deleter" id="'+i+'">X</td>'
	listdeletebtns = document.getElementsByClassName("deleter");
	for (let i = 0; i < listdeletebtns.length; i++)
		listdeletebtns[i].addEventListener('click', deletebar, false);


	status.style.display = "block";
	status.style.color = "green";
	status.innerHTML = "Searchbar added!";
});

function deletebar()
{
	var targetElement = event.target || event.srcElement;
	let bar = document.getElementById("trw" + targetElement.id);
	bar.remove();
	listData.splice(targetElement.id, 1);
}

savebtn.addEventListener("click", async () => {
	chrome.storage.sync.set({'list': JSON.stringify(listData)}, function()  {
		status_save.style.display = "block";
		status_save.style.color = "green";
		status_save.innerHTML = "Successful save!";
		var bgPage = chrome.extension.getBackgroundPage();
		bgPage.updatelist();
	});
});
