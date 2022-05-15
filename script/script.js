// Declare main variable - get main element by id
const main = document.getElementById('main');

let save = document.getElementById('save');
const body = document.getElementById('body');

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

	let bullet1 = document.createElement('li');
	bullet1.className = 'info__item';
	bullet1.innerHTML = '•';

	let bullet2 = document.createElement('li');
	bullet2.className = 'info__item';
	bullet2.innerHTML = '•';

	let addedBy = document.createElement('li');
	addedBy.className = 'info__item';
	addedBy.innerHTML = 'Added by ';
	addedBy.appendChild(author);

	ul.appendChild(tag);
	ul.appendChild(bullet1);
	ul.appendChild(addedBy);
	ul.appendChild(bullet2);
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
	let contentContainer = document.createElement('div');
	contentContainer.className = 'content__container';
	contentContainer.appendChild(content);
	parent.appendChild(contentContainer);

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


///////////////////////////// DAY 3 JS /////////////////////////////////

// Add article
function addArticleToServer() {
	const articleObj = {
		title: formTitle.value,
        tag: formTag.value,
        author: formAuthor.value,
        date: formDate.value,
        imgUrl: formImgUrl.value,
        content: formContent.value
	};
}

// Delete article from server
function deleteArticleFromServer(id) {
    // Solution here
}

// Update article
function updateArticleToServer(id) {
    // Solution here
}

// Copy edited article information to form and add event listener on Update button
function openAddModal() {
    clearSaveButtonEvents();
	save.addEventListener('click', () => {
		addArticleToServer();
	});
	
}

// Copy edited article information to form and add event listener on Update button
function openEditModal(article) {
    // Solution here
}

// Reset form values
function resetForm() {
    // Solution here
}
//  Remove Save Button to clear events
function clearSaveButtonEvents() {
    var newSave = save.cloneNode(true);
	save.parentNode.replaceChild(newSave, save);
}

// MODAL //
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