function showModal() {
	document.getElementById("modal").style.display = "block";
}

function hideModal() {
	document.getElementById("modal").style.display = "none";
}

const addButton = document.getElementById("add_article");
const editButtons = document.getElementsByClassName("edit_article");

for (let i = 0; i < editButtons.length; i++) {
	editButtons[i].addEventListener("click", showModal);
};

const cancelButton = document.getElementById("cancel");
const saveButton = document.getElementById("save");

addButton.addEventListener("click", showModal);

cancelButton.addEventListener("click", hideModal);
saveButton.addEventListener("click", hideModal);
