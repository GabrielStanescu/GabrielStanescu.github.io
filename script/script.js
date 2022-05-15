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
	let title = document.createElement('h1');
	title.className = 'title';
	title.innerHTML = article.title;

	let tag = document.createElement('li');
	tag.className = 'info__item';
	tag.innerHTML = article.tag;

	let author = document.createElement('span');
	author.className = 'info__author';
	author.innerHTML = article.author;

	let date = document.createElement('li');
	date.className = 'info__item';
	date.innerHTML = article.date;

	let imgUrl = document.createElement('img');
	imgUrl.src = article.imgUrl;
	imgUrl.alt = 'image';

	// let saying = document.createElement('p');
	// saying.innerHTML = article.saying;

	// let summary = document.createElement('p');
	// summary.innerHTML = article.summary;

	let content = document.createElement('p');
	content.className = 'content__text';
	content.innerHTML = article.content;

	// append title
	let parent = document.createElement('article');
	parent.appendChild(title);

	// create ul and append to parent
	let ul = document.createElement('ul');
	ul.className = 'info__container';

	let bullet = document.createElement('li');
	bullet.className = 'info__item';
	bullet.innerHTML = '•';

	let addedBy = document.createElement('li');
	addedBy.className = 'info__item';
	addedBy.innerHTML = 'Added by ';
	addedBy.appendChild(author);

	ul.appendChild(tag);
	ul.appendChild(bullet);
	ul.appendChild(addedBy);
	ul.appendChild(bullet);
	ul.appendChild(date);

	parent.appendChild(ul);

	// create buttons
	let buttonContainer = document.createElement('div');
	buttonContainer.className = 'modify__container';

	let editB = document.createElement('button');
	editB.type = 'button';
	editB.classList.add('modify__button', 'edit_article');
	editB.innerHTML = 'Edit';
	buttonContainer.appendChild(editB);

	let deleteB = document.createElement('button');
	deleteB.type = 'button';
	deleteB.className = 'modify__button';
	deleteB.innerHTML = 'Delete';
	buttonContainer.appendChild(deleteB);

	parent.appendChild(buttonContainer);

	// append image
	parent.appendChild(imgUrl);

	// append content
	parent.appendChild(content);

	return parent;
}

// Create DOM objects and append them to DOM
function renderArticles(articles) {

	removeOldArticlesFromDOM();

	// Create and append articles given as parameter
	for (let i = 0; i < articles.length; i++) {
		let article = createArticleDOMNode(articles[i]);
		main.appendChild(article);
	}
}

// Get all articles
getArticlesFromServer();