// Declare main variable - get main element by id
const main = document.getElementById('main');

let save = document.getElementById('save');
const body = document.getElementById('body');

const i1 = document.getElementById('i1');
const i2 = document.getElementById('i2');
const i3 = document.getElementById('i3');
const i4 = document.getElementById('i4');
const i5 = document.getElementById('i5');
const i6 = document.getElementById('i6');

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
	editB.addEventListener('click', () => {
		openEditModal(article);
	});
	buttonContainer.appendChild(editB);

	let deleteB = document.createElement('button');
	deleteB.type = 'button';
	deleteB.className = 'modify__button';
	deleteB.innerHTML = 'Delete';
	deleteB.addEventListener('click', () => {
		deleteArticleFromServer(article.id);
	});
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
		title: i1.value,
        tag: i2.value,
        author: i3.value,
        date: i4.value,
        imgUrl: i5.value,
        content: i6.value
	};

	fetch('http://localhost:3000/articles', {
		method: 'POST',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(articleObj)
	})
		.then(
			function (response) {
				if (response.status !== 201) {
					console.log('Could not add the article. Status Code: ' + response.status);
					return;
				}
				getArticlesFromServer();
				resetForm();
				hideModal();
			}
		)
		.catch(function (err) {
			console.log('Add Error', err);
		});
}

// Delete article from server
function deleteArticleFromServer(id) {
    fetch('http://localhost:3000/articles/' + id, {
		method: 'DELETE',
	})
		.then(
			function (response) {
				if (response.status !== 200) {
					console.log('Could not delete the article. Status Code: ' + response.status);
					return;
				}
				getArticlesFromServer();
			}
		)
		.catch(function (err) {
			console.log('Add Error', err);
		});
}

// Update article
function updateArticleToServer(id) {
	const articleObj = {
		title: i1.value,
        tag: i2.value,
        author: i3.value,
        date: i4.value,
        imgUrl: i5.value,
        content: i6.value
	};

	fetch('http://localhost:3000/articles/' + id, {
		method: 'PUT',
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(articleObj)
	})
		.then(
			function (response) {
				if (response.status !== 200) {
					console.log('Could not edit the article. Status Code: ' + response.status);
					return;
				}
				getArticlesFromServer();
				resetForm();
				hideModal();
			}
		)
		.catch(function (err) {
			console.log('Add Error', err);
		});
}

// Copy edited article information to form and add event listener on Update button
function openAddModal() {
    clearSaveButtonEvents();
	save.addEventListener('click', () => {
		addArticleToServer();
	});
	showModal();
}

// Copy edited article information to form and add event listener on Update button
function openEditModal(article) {
	i1.value = article.title;
    i2.value = article.tag;
    i3.value = article.author;
    i4.value = article.date;
    i5.value = article.imgUrl;
    i6.value = article.content;

	clearSaveButtonEvents();
	save.addEventListener('click', () => {
		updateArticleToServer(article.id);
	});
	showModal();
}

// Reset form values
function resetForm() {
    i1.value = '';
    i2.value = '';
    i3.value = '';
    i4.value = '';
    i5.value = '';
    i6.value = '';
}

//  Remove Save Button to clear events
function clearSaveButtonEvents() {
    var newSave = save.cloneNode(true);
	save.parentNode.replaceChild(newSave, save);
	save = document.getElementById('save');
}

// MODAL //
function showModal() {
	document.getElementById("modal").style.display = "block";
}

function hideModal() {
	resetForm();
	document.getElementById("modal").style.display = "none";
}

const addButton = document.getElementById("add_article");
const editButtons = document.getElementsByClassName("edit_article");

for (let i = 0; i < editButtons.length; i++) {
	editButtons[i].addEventListener("click", showModal);
};

const cancelButton = document.getElementById("cancel");

addButton.addEventListener("click", openAddModal);
cancelButton.addEventListener("click", hideModal);