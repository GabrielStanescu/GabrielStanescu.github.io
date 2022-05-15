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




// Declare main variable - get main element by id
const main = document.getElementById('main');

// Fetch the articles list
function getArticlesFromServer() {
	fetch('http://localhost:3000/articles')
		.then(
			function (response) {
				if (response.status !== 200) {
					console.log('Could not fetch the articles. Status Code: ' + response.status);
					return;
				}

				response.json().then(function (data) {
					renderArticles(data);
					console.log("test");
				});
			}
		)
		.catch(function (err) {
			console.log('Fetch Error', err);
		});
}

// Remove articles list if exist
function removeOldArticlesFromDOM() {
	main.innerHTML='';
}

function createArticleDOMNode(article) {
	// Solution here
}

// Create DOM objects and append them to DOM
function renderArticles(articles) {

	removeOldArticlesFromDOM();

	// Create and append articles given as parameter
	console.log(articles);
}

// Get all articles
getArticlesFromServer();