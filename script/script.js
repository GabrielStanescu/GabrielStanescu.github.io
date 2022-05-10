function showModal() {
	document.getElementById("modal").style.display = "block";
}

function hideModal() {
	console.log("t");
	document.getElementById("modal").style.display = "none";
}

const addButton = document.getElementById("add_article");
const editButton = document.getElementById("edit_article");

const cancelButton = document.getElementById("cancel");
const saveButton = document.getElementById("save");

addButton.addEventListener("click", showModal);
editButton.addEventListener("click", showModal);

cancelButton.addEventListener("click", hideModal);
saveButton.addEventListener("click", hideModal);
