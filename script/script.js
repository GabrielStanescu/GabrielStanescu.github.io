function showModal() {
	document.getElementsByClassName("modal")[0].style.display = "block";
}

function hideModal() {
	console.log("t");
	document.getElementsByClassName("modal")[0].style.display = "none";
}

const addButton = document.getElementById("add_article");
const editButton = document.getElementById("edit_article");
addButton.addEventListener("click", showModal);
editButton.addEventListener("click", showModal);

const cancelButton = document.getElementsByClassName("exit__button")[0];
console.log(cancelButton);
const saveButton = document.getElementsByClassName("exit__button")[1];
cancelButton.addEventListener("click", hideModal);
saveButton.addEventListener("click", hideModal);
